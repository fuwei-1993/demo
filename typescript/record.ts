function mapObject<K extends string | number, T, U>(
  target: Record<K, T>,
  cb: (val: T) => U
): Record<K, U> {
  const result = {} as Record<K, U>

  for (const key in target) {
    result[key] = cb(target[key])
  }

  return result
}

const test = {
  name: 'test',
  func: 'click',
}

mapObject(test, (val) => val.length)

// proxy

type Proxy<T> = {
  get: () => T
  set: (val: any) => void
}

type ProxyFy<T> = {
  [K in keyof T]: Proxy<T[K]>
}

function proxy<T>(target: T): ProxyFy<T> {
  const result = {} as ProxyFy<T>
  for (const key in target) {
    result[key] = {
      get() {
        return target[key]
      },
      set(value) {
        target[key] = value
      },
    }
  }
  return result
}

function unProxyFy<T>(target: ProxyFy<T>): T {
  const result = {} as T

  for (const key in target) {
    result[key] = target[key].get()
  }
  return result
}

const testProxy = {
  name: 'proxy',
  weight: '150kg',
}

console.log(proxy(testProxy).name.get())
console.log(unProxyFy(proxy(testProxy)))
