type GetValue<T extends object, K extends keyof T> = (obj: T, key: K) => T[K]

interface User {
  name: string
  gender: string
}

type GetUserValue = GetValue<User, keyof User>

const user: User = {
  name: 'Smith',
  gender: 'male',
}

const getUserVale: GetUserValue = (user, key) => {
  return user[key]
}

interface Part {
  id: string
  name: string
  underPart(newName: string): void
}

type PickFnName<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]

type PickResult = PickFnName<Part>

console.log(getUserVale(user,'name'))