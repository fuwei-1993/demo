type Func<T extends any[], R> = (...a: T) => R

/**
 * Composes 从右到左组成单参数函数。最右边
 * 函数可以采用多个参数，来为它
 * 合成函数
 * 
 * @param funcs The functions to compose
 * @returns A function obtained by composing the argument function from right
 * to left. For example `compose(f, g, h)` is identical to doing
 * `(...args) => f(g(h(...args)))`
 * 
 * note: 这里的一系列重载没看懂 可能后续支持文档没补充的功能
 */
export function compose(): <R>(a: R) => R

export function compose<F extends Function>(f: F): F

/* two functions */
export function compose<A, T extends any[], R>(
  f1: (a: A) => R,
  f2: Func<T,R>
): Func<T,R>

/* three functions */
export function compose<A, B, T extends any[], R>(
  f1: (b: B) => R,
  f2: (a: A) => B,
  f3: Func<T, A>
): Func<T, R>

/* four functions */
export function compose<A, B, C, T extends any[], R>(
  f1: (c: C) => R,
  f2: (b: B) => C,
  f3: (a: A) => B,
  f4: Func<T, A>
): Func<T, R>

/* rest */
export function compose<R>(
  f1: (a: any) => R,
  ...funcs: Function[]
): (...args: any[]) => R

export function compose<R>(...funcs: Function[]): (...args: any[]) => R

export function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    // infer the argument type so it is usable in inference down the line
    return <T>(arg: T) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((result, curr) => (...arg: any[]) => result(curr(...arg)))
}


