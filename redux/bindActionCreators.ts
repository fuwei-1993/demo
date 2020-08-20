import {
  AnyAction,
  ActionCreator,
  ActionCreatorsMapObject,
} from './types/actions'
import { Dispatch } from './types/store'

// 接收一个 actionCreator 和 dispatch
// 返回 一个返回值为 dispatch 执行结果的函数 你可以理解成 actionCreator
// 所以就是 dispatch 一个 actionCreator 生成的 action, 将 dispatch 返回的 action 作为 actionCreator



function bindActionCreator<A extends AnyAction = AnyAction>(
  actionCreator: ActionCreator<A>,
  dispatch: Dispatch
) {
  return function (this: any, ...args: any[]) {
    return dispatch(actionCreator.apply(this, args))
  }
}

/**
 * @param actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 * 
 * @example 
 * const addTodo = (text) => ({ type: ADD_TODO, value: text })
 * const addTodoBindDispatch = bindActionCreators(addTodo, store.dispatch);
 * addTodoBindDispatch('text')
 */

 // 重载：返回一个actionCreator 同函数 bindActionCreator
 // 类型 A 为 actionCreator 创建的 action 类型
function bindActionCreators<A, C extends ActionCreator<A>>(
  actionCreator: C,
  dispatch: Dispatch
): C

// 重载： 返回一个 actionCreator, action 类型为 any
function bindActionCreators<
  A extends ActionCreator<any>,
  B extends ActionCreator<any>
>(actionCreator: A, dispatch: Dispatch): B

// 重载：actionCreators 为 actionCreator 的 map 对象
// 所有 actionCreator 生成 action 为 A 类型
// 返回此 map 对象
function bindActionCreators<A, M extends ActionCreatorsMapObject<A>>(
  actionCreators: M,
  dispatch: Dispatch
): M


// 重载：actionCreators 为 actionCreator 的 map 对象
// 所有 actionCreator 生成 action 为 any 类型
// 返回此 map 对象
function bindActionCreators<
  M extends ActionCreatorsMapObject,
  N extends ActionCreatorsMapObject
>(actionCreators: M, dispatch: Dispatch): N

// 重载：actionCreators 可以为 actionCreator 的 map 对象和单纯的 actionCreator
function bindActionCreators(
  actionCreators: ActionCreator<any> | ActionCreatorsMapObject,
  dispatch: Dispatch
) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${
        actionCreators === null ? 'null' : typeof actionCreators
      }. ` +
        `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
    )
  }

  // 创建一个对象来绑定所有的actionCreator
  const boundActionCreators: ActionCreatorsMapObject = {}
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') {
      // 将 actionCreator 绑定 bindActionCreator 也就是 绑定 dispatch
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  // 返回绑定好的 map object 
  return boundActionCreators
}

export default bindActionCreators