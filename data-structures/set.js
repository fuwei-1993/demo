// 集合是由一组无序且唯一的项组成

class MySet {
  constructor() {
    this.items = {}
  }

  // has(element) {
  //   return element in this.items
  // }
  has(element) {
    return this.items.hasOwnProperty(element)
  }

  add(element) {
    if (!this.has(element)) {
      this.items[element] = element
      return true
    }
    return false
  }

  delete(element) {
    if (this.has(element)) {
      delete this.items[element]
      return true
    }
    return false
  }

  clear() {
    this.items = {}
  }

  size() {
    return Object.keys(this.items).length
  }

  values() {
    return Object.values(this.items)
  }
  /**
   * 并集：对于给定的两个集合，返回一个包含两个集合所有元素的新集合
   * @param {MySet} otherSet 
   */
  union(otherSet) {
    const unionSet = new MySet()

    function addValues (values, targetSet) {
      for(let i = 0; i < values.length; i++) {
        targetSet.add(values[i])
      }
    }

    addValues(this.values(), unionSet)
    addValues(otherSet.values(), unionSet)

    return unionSet
  }
  /**
   * 交集：对于给定的两个集合，返回一个包含两个集合的共有元素的新集合
   * @param {MySet} otherSet 
   */
  intersection(otherSet) {
    const intersectionSet = new MySet()
    const values = this.values()
    for(let i = 0; i < values.length; i++ ) {
      if(otherSet.has(values[i])) {
        intersectionSet.add(values[i])
      }
    }

    return intersectionSet
  }
  /**
   * 差集：对于给定的两个集合，返回一个所有存在于第一个集合且不存在于第二个集合的新集合
   * @param {MySet} otherSet 
   */
  difference(otherSet) {
    const differenceSet = new MySet()
    this.values().forEach((value) => {
      if(!otherSet.has(value)) {
        differenceSet.add(value)
      }
    })
    return differenceSet
  }

  /**
   * 子集： 验证一个给定集合是否是另一个集合的子集
   * @param {MySet} otherSet 
   */
  isSubsetOf(otherSet) {
    if(this.size() > otherSet.size()) return false
    return this.values().every(value => {
      return  otherSet.values().includes(value) 
    })
  }
}

const setA = new MySet()
setA.add(1)
setA.add(2)
setA.add(3)

const setB = new MySet()
setB.add(1)
setB.add(2)
setB.add(3)
setB.add(4)

const unionAB = setA.union(setB)
const intersectionAB = setA.intersection(setB)
const differenceAB = setA.difference(setB)
console.log(unionAB.values())
console.log(intersectionAB.values())
console.log(differenceAB.values())
console.log(setA.isSubsetOf(setB))