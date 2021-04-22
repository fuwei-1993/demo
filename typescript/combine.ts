/**
 * 作用其实是merge 两个对象 
 * ({ a: 1, b: { c:2 } }, { a: 4, b: { d:5 } }) => { a: 4, b: { c: 2, d: 5 } },
 */
type CombineObjects<T, U> = {
  [K in keyof (U & T)]: (U & T)[K] extends never
    ? K extends keyof U
      ? U[K]
      : never
    : K extends keyof U
    ? K extends keyof T
      ? T[K] & U[K] extends object
        ? CombineObjects<T[K], U[K]>
        : T[K]
      : U[K]
    : (U & T)[K]
}

type CombineA = { a: number, b: { d: number } }
type CombineB = { a: number, b: { d: string } }

const c = {} as CombineObjects<CombineA, CombineB>

// c.b.d >>> string
