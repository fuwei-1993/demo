interface IHuman {
  name: string
  height: string
  weight: string
}

type ReadonlyHuman = Readonly<IHuman>

type RemoveReadonly<T> = {
  -readonly [K in keyof T]: T[K] // + 代表加入 - 代表移除
}

type CanWriteHuman = RemoveReadonly<ReadonlyHuman>