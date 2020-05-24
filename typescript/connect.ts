interface Action<T> {
  payload?: T
  type: string
}

interface initInterface {
  count: number
  message: string
  asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>
  syncMethod<T, U>(action: Action<T>): Action<U>
}

type Result = {
  asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>
  syncMethod<T, U>(action: Action<T>): Action<U>
}

//step one get the func props
type RemoveNonFunctionProps<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : never
}[keyof T]

type FunctionProps = RemoveNonFunctionProps<initInterface>


