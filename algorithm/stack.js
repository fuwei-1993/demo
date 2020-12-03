const _items = Symbol('stackItems')
const _count = Symbol('stackCount')

class Stack {
  constructor() {
    this[_items] = []
    this[_count] = 0
  }

  toString() {
    return this[_items].toString()
  }

  size() {
    return this[_count]
  }

  isEmpty() {
    return this[_count] === 0
  }

  peek() {
    if (!this.isEmpty()) return this[_items][this[_count - 1]]
    return undefined
  }

  clear() {
    this[_items] = []
    this[_count] = 0
  }

  push(el) {
    this[_items].push(el)
    this[_count]++
  }

  pop() {
    if (!this.isEmpty()) {
      const result = this[_items].pop()
      this[_count]--
      return result
    }
  }
}

const stack = new Stack()

stack.push(1)
stack.push(8)
stack.pop()
console.log(stack.toString(), stack.size())

// 实践 1、 从十进制到二进制

function decimalToBinary(decNumber) {
  let number = decNumber
  const remStack = new Stack()
  let binaryString = ''

  while (number > 0) {
    const rem = Math.floor(number % 2)
    remStack.push(rem)
    number = Math.floor(number / 2)
  }

  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString()
  }

  return binaryString
}

console.log(decimalToBinary(10))

// 实践 2、把十进制转化为 2 - 36 的任意进制

function baseConverter(decNumber, base) {
  let number = decNumber
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const remStack = new Stack()
  let baseString = ''

  if (base < 2 || base > 36) return ''

  while (number > 0) {
    const rem = Math.floor(number % base)
    remStack.push(rem)
    number = Math.floor(number / base)
  }

  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()]
  }

  return baseString
}

console.log(baseConverter(10, 2))
console.log(baseConverter(10, 16))
