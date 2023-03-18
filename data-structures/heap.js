const Compare = {
  LESS_THAN: -1,
  EQUAL: 0,
  BIGGER: 1,
}

function defaultCompare(target, current) {
  if (target === current) {
    return Compare.EQUAL
  } else if (target > current) {
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

  getParentIndex(index) {
    return Math.floor((index - 1) / 2)
  }

  swap(target, index, parentIndex) {
    let temp = target[index]

    target[index] = target[parentIndex]
    target[parentIndex] = temp
  }

  shiftDown(index) {
    let current = index
    const left = this.findLeftIndex(index)
    const right = this.findRightIndex(index)

    if (
      left < this.size() &&
      this.compareFn(this.heap[left], this.heap[current]) === Compare.LESS_THAN
    ) {
      current = left
    }
    if (
      right < this.size() &&
      this.compareFn(this.heap[right], this.heap[current] === Compare.LESS_THAN)
    ) {
      current = right
    }
    if (current !== index) {
      this.swap(this.heap, index, current)
      this.shiftDown(current)
    }
  }

  extract() {
    if (this.isEmpty()) {
      return
    }
    if (this.size() <= 1) {
      return this.heap.pop()
    }

    const removed = this.heap[0]
    this.heap[0] = this.heap.pop()
    this.shiftDown(0)
    return removed
  }

  insert(value) {
    if (this.isEmpty()) {
      this.heap.push(value)
      return value
    }

    this.heap.push(value)
    const current = this.heap.length - 1
    let parentIndex = this.getParentIndex(current)

    while (
      this.compareFn(this.heap[current], this.heap[parentIndex]) ===
      Compare.LESS_THAN
    ) {
      this.swap(this.heap, current, parentIndex)
    }
  }
}

const minHeap = new MinHeap()

minHeap.insert(1)
minHeap.insert(3)
minHeap.insert(2)
minHeap.insert(4)
minHeap.insert(5)



console.log(minHeap)

minHeap.extract()

console.log(minHeap)
