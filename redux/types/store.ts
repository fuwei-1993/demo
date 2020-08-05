import { Action, AnyAction } from './action'
import '../utils/symbol-observable'
import { Reducer } from './reducers'
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

/**
 * @template A The type of things (actions or otherwise) which may be
 * despatch
 */
export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T, ...extraArgs: any[]): T
}

/**
 *  Function to remove listener added by `Store.subscribe`
 */
export interface Unsubscribe {
  (): void
}

/**
 * An Observer is used to receive data from an Observable, and is supplied
 * an argument to subscribe
 */
export type Observer<T> = {
  next?(value: T): void
}

export type Observable<T> = {
  /**
   * @param {Object} observer Any object that can be used as an observer
   * The observer object should have a `next` method
   * @return {subscription} An object with an `unsubscribe` that can be used
   * to unsubscribe the observable from the store, and prevent further
   * emission of values from the observable
   */
  subscribe: (observer: Observer<T>) => { unsubscribe: Unsubscribe }
  [Symbol.observable](): Observable<T>
}

/**
 * A store is object that holds the application's state tree
 * There should only be a single store in a Redux app, as the composition
 * happens on the reducer level
 *
 * @template S the type of state held by this store
 * @template A the type of actions which may be dispatched by this store
 * @template StateExt any extension to state from store enhancers
 * @template Ext any extensions to the store from store enhancers
 */
export interface Store<
  S = any,
  A extends Action = AnyAction,
  StateExt = never,
  Ext = {}
> {
  /**
   * @param action A plain object representing “what changed”. It is a good
   *   idea to keep actions serializable so you can record and replay user
   *   sessions, or use the time travelling `redux-devtools`. An action must
   *   have a `type` property which may not be `undefined`. It is a good idea
   *   to use string constants for action types.
   *
   * @returns For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  dispatch: Dispatch<A>

  /**
   * Reads the state tree managed by the store
   *
   * @returns The current state tree of your application
   */
  getState(): S

  /**
   * @param listener A callback to be invoked on every dispatch
   * @returns A function to remove this change listener
   */
  subscribe(listener: () => void): Unsubscribe

  /**
   * @param nextReducer The reducer for the store to use instead
   */
  replaceReducer<NewState, NewActions extends Action>(
    nextReducer: Reducer<NewState, NewActions>
  ): Store<ExtendState<NewState, StateExt>, NewActions, StateExt, Ext> & Ext

  /**
   * @returns {observable} A minimal observable of state changes
   */
  [Symbol.observable](): Observable<S>
}

/** @template Ext Store extension that is mixed into the Store type.
 * @template StateExt State extension that is mixed into the state type.
 */
export type StoreEnhancerStoreCreator<Ext = {}, StateExt = never> = <
  S = any,
  A extends Action = AnyAction
>(
  reducer: Reducer<S, A>,
  preloadedState?: PreloadedState<S>
) => Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext

export type StoreEnhancer<Ext = {}, StateExt = never> = (
  next: StoreEnhancerStoreCreator<Ext, StateExt>
) => StoreEnhancerStoreCreator<Ext, StateExt>

/**
 * store creator is a function that creates a Redux store.
 *
 * @template S The type of state to be held by the store.
 * @template A The type of actions which may be dispatched.
 * @template Ext Store extension that is mixed in to the Store type.
 * @template StateExt State extension that is mixed into the state type.
 */
export interface StoreCreator {
  <S, A extends Action, Ext = {}, StateExt = never>(
    reducer: Reducer<S, A>,
    enhancer?: StoreEnhancer<Ext, StateExt>
  ): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext
  <S, A extends Action, Ext = {}, StateExt = never>(
    reducer: Reducer<S, A>,
    preloadedState?: PreloadedState<S>,
    enhancer?: StoreEnhancer<Ext>
  ): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext
}
