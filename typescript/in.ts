type name = 'Smith' | 'Sam' | symbol

type TName = {
  [key in name]: string
}

type INameCollection<T> = {
  names: T extends  keyof TName ? T : never
}