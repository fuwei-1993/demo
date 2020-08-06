import { Action } from './types/action'
import { Reducer } from './types/reducers'
import {
  StoreEnhancer,
  Store,
  ExtendState,
  PreloadedState,
} from './types/store'

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
export function createStore<S, A extends Action, Ext = {}, StateExt = never>(
  reducer: Reducer<S, A>,
  enhancer?: StoreEnhancer<Ext, StateExt>
): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext
export function createStore<S, A extends Action, Ext = {}, StateExt = never>(
  reducer: Reducer<S, A>,
  preloadedState?: PreloadedState<S>,
  enhancer?: StoreEnhancer<Ext, StateExt>
): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext
export function createStore<S, A extends Action, Ext = {}, StateExt = never>(
  reducer: Reducer<S, A>,
  preloadedState?: PreloadedState<S> | StoreEnhancer<Ext, StateExt>,
  enhancer?: StoreEnhancer<Ext, StateExt>
): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext {
  if (
    (typeof preloadedState === 'function' && typeof enhancer === 'function') ||
    (typeof enhancer === 'function' && typeof arguments[3] === 'function')
  ) {
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

  const currentReducer = reducer
  const currentState = preloadedState as S
  const currentListeners: (() => void)[] | null = []
  const nextListeners = currentListeners
  let isDispatching: boolean = false
}
