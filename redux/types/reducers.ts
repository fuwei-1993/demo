import { AnyAction, Action } from './actions'

/* reducers */

/**
 * @template S the type of state consumed and produced by this reducer
 * @template A the type of actions the reducer can potentially respond to
 */
export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S

/**
 * Object whose values correspond to different reducer function
 *
 * @template  A the type of actions the reducers can potentially respond to
 */
export type ReducersMapObject<S = any, A extends Action = AnyAction> = {
  [K in keyof S]: Reducer<S[K], A>
}

/**
 *  Infer a combined state shape from a `ReducersMapObject`
 * @template  M Object map of reducer as provided to `combineReducers(map: M)`
 */
export type StateFromReducersMapObject<M> = M extends ReducersMapObject
  ? { [P in keyof M]: M[P] extends Reducer<infer S, any> ? S : never }
  : never

/**
 * Infer reducer union type from `ReducersMapObject`
 *
 * @template M Object map of reducer as provided to `combineReducers(map: M)`
 */
export type ReducerFromReducersMapObject<M> = M extends {
  [P in keyof M]: infer R
}
  ? R extends Reducer<any, any>
    ? R
    : never
  : never

/**
 * Infer action type from reducer function
 *
 * @template R Type of reducer
 */
export type ActionFromReducer<R> = R extends Reducer<any, infer A> ? A : never


/**
 *  Infer action union type from a `ReducersMapObject`
 * @template M Object map of reducer as provided to `combineReducers(map: M)`
 */
// export type ActionFromReducersMapObject<M> = M extends ReducersMapObject<any, infer A> ? A : never
export type ActionFromReducersMapObject<M> = M extends ReducersMapObject<any, any> ? ActionFromReducer<ReducerFromReducersMapObject<M>> : never