/**
 * @param obj The object to inspect
 * @returns True if the argument appears to be a plain object
 */
export function isPlainObject(obj: unknown): boolean {
  if(typeof obj !== 'object' || obj === null) return false

  let prototype = obj
  while(Object.getPrototypeOf(prototype) !== null) {
    prototype = Object.getPrototypeOf(prototype)
  }

  return Object.getPrototypeOf(obj) === prototype
}