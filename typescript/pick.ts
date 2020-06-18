interface ITestObj {
  name: string
  age: number
  gender: string
}

const testObj: ITestObj = {
  name: 'test',
  age: 18,
  gender: 'female',
}

function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as T

  keys.forEach((key) => {
    result[key] = obj[key]
  })
  return result
}

const pickObj =  pick(testObj,['age','gender'])