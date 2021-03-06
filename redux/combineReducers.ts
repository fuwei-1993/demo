import { Action, AnyAction } from './types/actions'
import {
  ReducersMapObject,
  Reducer,
  StateFromReducersMapObject,
  ActionFromReducersMapObject,
} from './types/reducers'
import ActionTypes from './utils/actionTypes'
import { isPlainObject } from './utils/isPlainObject'
import { CombinedState } from './types/store'
import warning from './utils/warning'

function getUndefinedStateErrorMessage(key: string, action: Action) {
  const actionType = action?.type
  const actionDescription =
    (actionType && `action "${String(actionType)}"`) || 'an action'

  return (
    `Given ${actionDescription}, reducer "${key}" returned undefined. ` +
    `To ignore an action, you must explicitly return the previous state. ` +
    `If you want this reducer to hold no value, you can return null instead of undefined.`
  )
}

function getUnexpectedStateShapeWarningMessage(
  inputState: object,
  reducers: ReducersMapObject,
  action: Action,
  unexpectedKeyCache: { [key: string]: true }
) {
  const reducerKeys = Object.keys(reducers)
  const argumentName =
    action?.type === ActionTypes.INIT
      ? 'preloadedState argument passed to createStore'
      : 'previous state received by reducer'

  if (!reducerKeys.length) {
    return (
      'Store does not have a valid reducer. Make sure the argument passed ' +
      'to combineReducers is an object whose values are reducers.'
    )
  }

  if (!isPlainObject(inputState)) {
    const match = Object.prototype.toString.call(inputState).match(/\s([A-z]+)/)
    const matchType = match ? match[1] : ''

    return (
      `The ${argumentName} has unexpected type of "` +
      matchType +
      `". Expected argument to be an object with the following ` +
      `keys: "${reducerKeys.join('", "')}"`
    )
  }

  // 过滤出 reducers 和 unexpectedKeyCache 都没有 inputState 中的key
  const unexpectedKeys = Object.keys(inputState).filter(
    (key) => !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key]
  )

  // unexpectedKeys 添加 unexpectedKeys 的 key 并且赋值为 true
  unexpectedKeys.forEach((key) => {
    unexpectedKeyCache[key] = true
  })

  // 如果是走的 ActionTypes.REPLACE 就 return ， 就是说走的 replaceReducer
  if (action?.type === ActionTypes.REPLACE) return

  if (unexpectedKeys.length > 0) {
    return (
      `Unexpected ${unexpectedKeys.length > 1 ? 'keys' : 'key'} ` +
      `"${unexpectedKeys.join('", "')}" found in ${argumentName}. ` +
      `Expected to find one of the known reducer keys instead: ` +
      `"${reducerKeys.join('", "')}". Unexpected keys will be ignored.`
    )
  }
}

// 断言 reducer 的边界
function assertReducerShape(reducers: ReducersMapObject) {
  Object.keys(reducers).forEach((key) => {
    const reducer = reducers[key]
    const initialState = reducer(undefined, { type: ActionTypes.INIT })

    if (typeof initialState === 'undefined') {
      throw new Error(
        `Reducer "${key}" returned undefined during initialization. ` +
          `If the state passed to the reducer is undefined, you must ` +
          `explicitly return the initial state. The initial state may ` +
          `not be undefined. If you don't want to set a value for this reducer, ` +
          `you can use null instead of undefined.`
      )
    }

    if (
      typeof reducer(undefined, {
        type: ActionTypes.PROBE_UNKNOWN_ACTION(),
      }) === 'undefined'
    ) {
      throw new Error(
        `Reducer "${key}" returned undefined when probed with a random type. ` +
          `Don't try to handle ${ActionTypes.INIT} or other actions in "redux/*" ` +
          `namespace. They are considered private. Instead, you must return the ` +
          `current state for any unknown actions, unless it is undefined, ` +
          `in which case you must return the initial state, regardless of the ` +
          `action type. The initial state may not be undefined, but can be null.`
      )
    }
  })
}

/**
 * @template S Combined state object type
 *
 * @param reducers An object whose values correspond to different reducer
 *   functions that need to be combined into one. One handy way to obtain it
 *   is to use ES6 `import * as reducers` syntax. The reducers may never
 *   return undefined for any action. Instead, they should return their
 *   initial state if the state passed to them was undefined, and the current
 *   state for any unrecognized action.
 *
 * @returns A reducer function that invokes every reducer inside the passed object,
 *   and builds a state object with the same shape
 */
function combineReducers<S>(
  reducers: ReducersMapObject<S, any>
): Reducer<CombinedState<S>>

function combineReducers<S, A extends Action = AnyAction>(
  reducers: ReducersMapObject<S, A>
): Reducer<CombinedState<S>, A>

function combineReducers<M extends ReducersMapObject>(
  reducers: M
): Reducer<
  CombinedState<StateFromReducersMapObject<M>>,
  ActionFromReducersMapObject<M>
>

function combineReducers(reducers: ReducersMapObject) {
  const reducerKeys = Object.keys(reducers)
  const finalReducers: ReducersMapObject = {}
  // 把所有 reducer 的 key 取出来
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i]

    // 开发环境的话 发现一reducer是 undefined 就 warning
    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning(`No reducer provided for key "${key}"`)
      }
    }

    // 如果 reducer 是函数就赋值给刚才创建好的 finalReducers 中
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }

  // 取出是函数的 reducer key
  const finalReducerKeys = Object.keys(finalReducers)


  // This is used to make sure we don't warn about same
  // key multiple times
  let unexpectedKeyCache: { [key: string]: true }
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {}
  }

  let shapeAssertionError: Error

  try {
    assertReducerShape(finalReducers)
  } catch (e) {
    shapeAssertionError = e
  }

  return function combination(
    state: StateFromReducersMapObject<typeof reducers> = {},
    action: AnyAction
  ) {
    if (shapeAssertionError) {
      throw shapeAssertionError
    }

    if (process.env.NODE_ENV !== 'production') {
      const warningMessage = getUnexpectedStateShapeWarningMessage(
        state,
        finalReducers,
        action,
        unexpectedKeyCache
      )

      if (warningMessage) {
        warning(warningMessage)
      }
    }

    let hasChanged = false

    // StateFromReducersMapObject key 是reducers 的 key 然后值是 reducer 里的 state
    const nextState: StateFromReducersMapObject<typeof reducers> = {}
    for (let i = 0; i < finalReducerKeys.length; i++) {
      // 取出 是函数的 reducer 的key
      const key = finalReducerKeys[i]
      // 取出 reducer
      const reducer = finalReducers[key]
      // 看命名表示的 上一次的 state 中 key 是reducer key的值
      // 可以推测出这里的 state 结构应该是 { [key]: state } 
      const previousStateForKey = state[key]
      // 获取下一次 state
      const nextStateForKey = reducer(previousStateForKey, action)
      if (typeof nextStateForKey === 'undefined') {
        const errorMessage = getUndefinedStateErrorMessage(key, action)
        throw new Error(errorMessage)
      }
      // 将下一次 state 存进 nextState
      nextState[key] = nextStateForKey

      // 判断上一次是否等于下一次 来确定它是否变化
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    hasChanged =
      hasChanged || finalReducerKeys.length !== Object.keys(state).length

    // 变化来取下一个 state , 没有取当前的
    return hasChanged ? nextState : state
  }
}

export default combineReducers
