function defaultEquals(a, b) {
  return a === b
}

class Node {
  constructor(element) {
    this.element = element
    this.next = undefined
  }
}

class LinkedList {
  head = null
  count = 0

  push(element) {
    const node = new Node(element)
    let current
    if (!this.head) {
      this.head = node
    } else {
      current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }

    this.count++
  }
  
  insert() {}
  
  getElementAt(index) {
    // 返回链表中指定位置的元素，没有就是 undefined
    if (index < 0 || index >= this.count) return undefined

    let node = this.head
    for (let i = 0; i < index && node; i++) {
      node = node.next
    }

    return node
  }

  remove() {}

  indexOf() {}

  removeAt(index) {
    if (index < 0 || index >= this.count) return undefined

    this.count--

    if (index === 0) {
      const current = this.head
      this.head = this.head.next
      return current
    }

    const previous = this.getElementAt(index - 1)
    const current = previous.next

    previous.next = current.next

    return current
  }

  isEmpty() {}

  size() {}

  toString() {}
}

const list = new LinkedList()

list.push(15)
list.push(10)

list.removeAt(2)
console.log(list)
