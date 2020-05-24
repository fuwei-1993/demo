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

console.log(getUserVale(user,'name'))