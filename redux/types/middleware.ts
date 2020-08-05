import { Dispatch } from './store'

export interface MiddlewareAPI<D extends Dispatch = Dispatch, S = any> {
  dispatch: D
  getState(): S
}

/**
 * A middleware is a higher-order function that composes a dispatch function
 * to return a new dispatch function . It often turns async action into
 * actions
 *
 * @template DispatchExt Extra Dispatch signature added by this middleware
 * @template S The type of the state supported by this middleware.
 * @template D The type of Dispatch of the store where this middleware is installed
 */
export interface Middleware<
  _DispatchExt = {}, // 源码居然 todo ?? 六个月前得 todo 可怕
  S = any,
  D extends Dispatch = Dispatch
> {
  (api: MiddlewareAPI<D, S>): (
    next: D
  ) => (action: D extends Dispatch<infer A> ? A : never) => any
}
