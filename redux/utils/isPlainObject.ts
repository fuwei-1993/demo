/**
 * @param obj The object to inspect
 * @returns True if the argument appears to be a plain object
 */
// 判断是否是简单对象 {}， 即不是函数也不是数组等
// 通过和 Object 的 最终原型比较
export function isPlainObject(obj: unknown): boolean {
  if(typeof obj !== 'object' || obj === null) return false

  let prototype = obj
  while(Object.getPrototypeOf(prototype) !== null) {
    prototype = Object.getPrototypeOf(prototype)
  }

  return Object.getPrototypeOf(obj) === prototype
}