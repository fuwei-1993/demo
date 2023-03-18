const Compare = {
  LESS_THAN: -1,
  EQUAL: 0,
  BIGGER: 1
}

function defaultCompare(target, current) {
  if(target === current) {
    return Compare.EQUAL
  } else if(target > current) {
    return Compare.BIGGER
  } else {
    return Compare.LESS_THAN
  }
}

class MinHeap {
  heap = []
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn
  }
  findLeftIndex(index) {
    return 2 * index + 1
  }
  findRightIndex(index) {
    return 2 * index + 2
  }

  size() {
    return this.heap.length
  }

  isEmpty() {
    return this.size() === 0
  }

  insert(value) {
    if(this.isEmpty()) {
      this.heap.push(value)
      return value
    }

  }
}
