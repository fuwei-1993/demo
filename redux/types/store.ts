/**
 * Extend the state
 *
 * If there is no state extension, it just returns the state,
 * as is, otherwise it returns the state joined with its extension
 */

export type ExtendState<State, Extension> = [Extension] extends [never] // 没看懂这个中括号的含义，感觉可以省略
  ? State
  : State & Extension

/**
 *  Internal 'virtual' symbol used to make the `CombinedState` type unique
 */
declare const $CombinedState: unique symbol

/**
 * It's too long to bother to write
 */
export type CombinedState<S> = { readonly [$CombinedState]?: undefined } & S


/**
 * 这个写的是啥 ** 玩意儿
 */
export type PreloadedState<S> = Required<S> extends {
  [$CombinedState]: undefined
}
  ? S extends CombinedState<infer S1>
    ? {
        [K in keyof S1]?: S1[K] extends object ? PreloadedState<S1[K]> : S1[K]
      }
    : never
  : {
      [K in keyof S]: S[K] extends string | number | boolean | symbol
        ? S[K]
        : PreloadedState<S[K]>
    }
