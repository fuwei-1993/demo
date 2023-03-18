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
minHeap.insert(0)
minHeap.insert(5)
minHeap.insert(3)
minHeap.insert(4)
minHeap.insert(6)
minHeap.insert(2)
minHeap.insert(7)

console.log(minHeap);