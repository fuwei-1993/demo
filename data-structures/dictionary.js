function defaultToString(item) {
  if (item === null) return 'NULL'
  if (item === undefined) return 'UNDEFINED'
  if (typeof item === 'string' || item instanceof String) return `${item}`

  return item.toString()
}

class ValuePair {
  constructor(key, value) {
    this.key = key
    this.value = value
  }

  toString() {
    return `[${this.key}: ${this.value}]`
  }
}

class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }

  hasKey(key) {
    return !!this.table[this.toStrFn(key)]
  }

  set(key, value) {
    if (key && value) {
      const tableKey = this.toStrFn(key)
      this.table[tableKey] = new ValuePair(key, value)
      return true
    }
    return false
  }
  // 和集合的不点在于优先搜索的是key 而不是value
  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)]
      return true
    }
    return false
  }

  get(key) {
    // 缺点是要访问两次table对象
    if (this.hasKey(key)) {
      return this.table[this.toStrFn(key)]
    }
    return undefined
  }

  values() {
    return Object.keys(this.table)
  }

  keyValues() {
    const valuePairs = []
    for (const k in this.table) {
      if (this.hasKey(k)) {
        valuePairs.push(this.table[k])
      }
    }

    return valuePairs
  }

  keys() {
    return this.keyValues().map((valuePair) => valuePair.key)
  }

  values() {
    return this.keyValues().map((valuePair) => valuePair.value)
  }

  forEach(callBackFn) {
    const valuePairs = this.keyValues()

    for (let i = 0; i < valuePairs.length; i++) {
      const valuePair = valuePairs[i]
      const result = callBackFn(valuePair.key, valuePair.value, i)
      if (result === false) {
        break
      }
    }
  }

  size() {
    return Object.keys(this.table).length
  }

  isEmpty() {
    return this.size() === 0
  }

  clear() {
    this.table = {}
  }

  toString() {
    const valuePairs = this.keyValues()
    let str = `${valuePairs[0].toString()}`

    for (let i = 1; i < valuePairs.length; i++) {
      str += `, ${valuePairs[i].toString()}`
    }

    return str
  }
}

const dictionary = new Dictionary()
dictionary.set('Gandalf', 'gandalf@email.com')
dictionary.set('John', 'john@email.com')
dictionary.set('Tyrian', 'tyrian@email.com')

console.log(dictionary.keyValues())
console.log(dictionary.get('Gandalf'))
console.log(dictionary.toString())
