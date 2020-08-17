import { Action } from './types/actions'
import { Reducer } from './types/reducers'
import {
  StoreEnhancer,
  Store,
  ExtendState,
  PreloadedState,
  Observer,
  Dispatch,
} from './types/store'
import { isPlainObject } from './utils/isPlainObject'
import ActionTypes from './utils/actionTypes'
import $$observable from './utils/symbol-observable'

/**
 * Creates a Redux store that holds the state tree
 *
 * @param reducer A function that returns the next state tree, given
 * the current state tree and the action to handle
 *
 * @param preloadedState The initial state
 *
 * @param enhancer The store enhancer
 *
 * @returns A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes
 */
function createStore<S, A extends Action, Ext = {}, StateExt = never>(
  reducer: Reducer<S, A>,
  enhancer?: StoreEnhancer<Ext, StateExt>
): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext
function createStore<S, A extends Action, Ext = {}, StateExt = never>(
  reducer: Reducer<S, A>,
  preloadedState?: PreloadedState<S>,
  enhancer?: StoreEnhancer<Ext, StateExt>
): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext
function createStore<S, A extends Action, Ext = {}, StateExt = never>(
  reducer: Reducer<S, A>,
  preloadedState?: PreloadedState<S> | StoreEnhancer<Ext, StateExt>,
  enhancer?: StoreEnhancer<Ext, StateExt>
): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext {
  // 三个参数 reducer preloadedState 和 enhancer: applyMiddleware 返回的函数

  if (
    (typeof preloadedState === 'function' && typeof enhancer === 'function') ||
    (typeof enhancer === 'function' && typeof arguments[3] === 'function')
  ) {

    // 如果preloadedState 和 enhancer 同时为函数或者 enhancer 和第四个参数均为函数则猜测多了一个 enhancer
    throw new Error(
      'It looks like you are passing several store enhancers to ' +
        'createStore(). This is not supported. Instead, compose them ' +
        'together to a single function.'
    )
  }

  // 这个部分第一眼看上去有点谜 其实就是重载 createStore(reducer, preloadedState) | createStore(reducer, enhancer)
  // 所以讲道理不如 直接重载 createStore(reducer, preloadedState)，写了一大堆可选
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState as StoreEnhancer<Ext, StateExt>
    preloadedState = undefined
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function')
    }

    return enhancer(createStore)(
      reducer,
      preloadedState as PreloadedState<S>
    ) as Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function')
  }

  let currentReducer = reducer
  let currentState = preloadedState as S
  let currentListeners: (() => void)[] | null = []
  let nextListeners = currentListeners
  let isDispatching: boolean = false

  function ensureCanMutateNextListener() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  /**
   * Reads the state three managed by the store
   *
   * @return The current state tree of you application
   */
  function getState(): S {
    if (isDispatching) {
      throw new Error(
        `在执行 reducer 时不能调用 store.getState() ，reducer 已经接收 state 为参数
        从顶部的 reducer 传下来代替从 store 中读取`
      )
    }
    return currentState
  }

  /**
   * @param listener A callback to be invoked on every dispatch
   * @returns A function to remove this change listener
   */
  function subscribe(listener: () => void) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function')
    }

    if (isDispatching) {
      throw new Error(
        `在执行 reducer 的时候不能调用 store.subscribe()，如果你想要 store 更新时被通知到，
        从组件订阅并在回调中调用 store.getState 以获取最新的 state`
      )
    }

    let isSubscribed = true

    ensureCanMutateNextListener()
    nextListeners.push(listener)

    return function unsubscribe() {
      if (isSubscribed) {
        return
      }

      if (isDispatching) {
        throw new Error('你不能在reducer执行的时候取消订阅')
      }

      isSubscribed = false

      ensureCanMutateNextListener()
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
      currentListeners = null
    }
  }

  /**
   * @param action A plain object representing 'what changed'
   *
   * @returns For convenience, the same action object you dispatched
   */
  function dispatch(action: A) {
    if (!isPlainObject(action)) {
      throw new Error(
        `Action must be plain objects. Use custom middleware for async actions`
      )
    }

    if (typeof action.type === 'undefined') {
      throw new Error(`Actions may not have an undefined 'type' property`)
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatching action')
    }

    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }

    const listeners = (currentListeners = nextListeners)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }

    return action
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state
   *
   * @param nextReducer The reducer for the store to use instead
   * @returns The same store instance with a new reducer in place
   */
  function replaceReducer<newState, NewActions extends A>(
    nextReducer: Reducer<newState, NewActions>
  ): Store<ExtendState<newState, StateExt>, NewActions, StateExt, Ext> & Ext {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function')
    }
    // TODO: do this more elegantly 十分的有趣，官方可能觉得这样写部太优雅，所以有了这个todo
    ;((currentReducer as unknown) as Reducer<
      newState,
      NewActions
    >) = nextReducer

    // 此操作具有与 ActionTypes.INIT 类似的效果。
    // 新旧 rootReducer 中都存在的所有 reducers
    // 会收到之前的 state。有效地填充
    // 新 state tree，其中包含旧s tate tree 中的任何相关数据
    dispatch({ type: ActionTypes.REPLACE } as A)

    // store 类型转化为 new store 的类型
    // TODO: store 还不知道是从哪来的
    const store = ''
    
    return (store as unknown) as Store<
      ExtendState<newState, StateExt>,
      NewActions,
      StateExt,
      Ext
    > &
      Ext
  }

  /**
   * Interoperability point for observable/reactive libraries
   * @return A minimal observable of state changes
   */
  function observable() {
    const outerSubscribe = subscribe
    return {
      /**
       * The minimal observable subscription method
       * @param observer Any object that can be used as an observer
       * The observer object should have a `next` method
       * @return An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable
       */
      subscribe(observer: unknown) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object')
        }

        function observeState() {
          const observerAsObserver = observer as Observer<S>
          if (observerAsObserver.next) {
            observerAsObserver.next(getState())
          }
        }

        observeState()
        const unsubscribe = outerSubscribe(observeState)
        return { unsubscribe }
      },

      [$$observable]() {
        return this
      },
    }
  }

  // 创建store 后，将 dispatch 'INIT' 操作，以便每个
  // reducer返回其初始状态。有效地填充
  // 初始 state tree。
  dispatch({ type: ActionTypes.INIT } as A)

  const store = ({
    dispatch: dispatch as Dispatch<A>,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable,
  } as unknown) as Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext
  return store
}

export default createStore
