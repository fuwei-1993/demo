type name = 'Smith' | 'Sam' | symbol

type TName = {
  [key in name]: string
}

const idCard: unique symbol = Symbol('identify')

type INameCollection<T> = {
  names: T extends keyof TName ? T : never,
  [idCard]: 'fuwei'
}

const collection: INameCollection<name> = {
  names: 'Smith',
  [idCard]: 'fuwei'
}


type TypeSymbolTest = {
  [K : number]: string
}

type symbolKey = symbol


const customObj:TypeSymbolTest = {
  [0]: '123'
}

const spread = <T, U>(a: T, b: U) => {
  return {...a, ...b}
}




