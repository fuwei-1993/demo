// 单向链表
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
  constructor(equalsFn = defaultEquals) {
    this.equalsFn = equalsFn
  }

  push(element, NodeClass = Node) {
    const node = new NodeClass(element)
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

    return node
  }

  insert(element, index) {
    if (index < 0 || index > this.count) return false

    const node = new Node(element)

    this.count++

    if (index === 0) {
      node.next = this.head
      this.head = node

      return true
    }

    const previous = this.getElementAt(index - 1)
    const current = previous.next

    previous.next = node
    node.next = current

    return true
  }

  getElementAt(index) {
    // 返回链表中指定位置的元素，没有就是 undefined
    if (index < 0 || index >= this.count) return undefined

    let node = this.head
    for (let i = 0; i < index && node; i++) {
      node = node.next
    }

    return node
  }

  remove() {
    if (!this.count) return undefined

    let current = this.head
    let previous

    while (current.next) {
      previous = current
      current = current.next
    }

    previous.next = undefined
    this.count--
    return previous.next
  }

  indexOf(element) {
    // 根据元素来查找出 index
    let current = this.head

    for (let i = 0; i < this.count; i++) {
      if (this.equalsFn(element, current.element)) {
        return i
      } else {
        current = current.next
      }
    }

    return -1
  }

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

  isEmpty() {
    return this.size() === 0
  }

  size() {
    return this.count
  }

  getHead() {
    return this.head
  }

  toString() {
    if (!this.size()) return ''

    let current = this.head
    let objString = ''

    for (let i = 0; i < this.size() && current; i++) {
      objString += `${current.element},`
      current = current.next
    }

    return objString
  }
}

const list = new LinkedList()

list.push(15)
list.push(10)

list.removeAt(2)

list.insert(11, 2)

console.log(list.indexOf(15), list.indexOf(11))
console.log(list.toString())

// 双向链表

class DoublyNode extends Node {
  constructor(element, next, prev) {
    super(element, next)
    this.prev = prev
  }
}

class DoublyLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn)
    this.tail = undefined
  }

  push(element) {
    const node = super.push(element, DoublyNode)
    if(!this.tail)  {
      this.tail = node
    } else {
      const current = this.tail
      current.next = node
      node.prev = current
      this.tail = node
    }
  }

  insert(element, index) {
    const node = new DoublyNode(element)
    if (index < 0 || index > this.count) return false
    
    if (index === 0) {
      if (this.head) {
        const current = this.head
        node.next = current
        current.prev = node
      } else {
        this.tail = node
      }
      this.head = node
      
      this.count++
      return true
    }

    if (index === this.count) {
      const current = this.tail
      current.next = node
      this.tail = node
      node.prev = current

      this.count++
      return true
    }

    const previous = this.getElementAt(index - 1)
    const current = previous.next

    node.prev = previous
    node.next = current
    previous.next = node
    current.prev = node

    this.count++
    return true
  }
}

const dList = new DoublyLinkedList()

dList.push(15)
dList.push(10)

dList.removeAt(2)

dList.insert(11, 2)

console.log(dList.indexOf(15), dList.indexOf(11))
console.log(dList)
