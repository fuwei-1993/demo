const myTuple = [1,2,3,4] as const

const myArray = ['hello', 'world']

function tail<T extends any[]>(arr: readonly [any, ...T]) {
  const [_ignored, ...rest] = arr
  return rest
}

const r1 = tail(myTuple)

const r2 = tail([...myTuple, ...myArray] as const)

type Arr = readonly any[]

function concat<T extends Arr, U extends Arr>(arr1:T,arr2: U): [...T, ...U] {
  return [...arr1, ...arr2]
}

// TypeScript 4.0 improves the inference process for rest parameters and rest tuple elements so that we can type this and have it “just work”.

type Arr2 = readonly unknown[]

function partialCall<T extends Arr2, U extends Arr2, R>(
  fn: (...args: [...T, ...U]) => R,
  ...headArgs: T
) {
  return (...tailArgs: U) => fn(...headArgs, ...tailArgs)
}

const fooForPartial = (x: string, y: number, z: boolean) => {}

const fp1 = partialCall(fooForPartial, '100', 100)

const fp2 = fp1(true)

// tryCallF

function tryCallF(a: any) {
  return a && a.b.c && a.b.c.d.e.f()
}

// deprecated

let obj = {
  /** @deprecated */
  someOperation() {}
}

obj.someOperation();