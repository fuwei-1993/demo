class Node {
  constructor(key) {
    this.key = key // 节点值
    this.left = null // 左侧子节点引用
    this.right = null // 右侧子节点引用
  }
}

const Compare = {
  LESS_THAN: 'LESS_THAN',
  MORE_THAN: 'MORE_THAN',
}

const defaultCompare = (key, target) => {
  return key < target ? Compare.MORE_THAN : Compare.LESS_THAN
}

class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn // 用来比较节点值
    this.root = null // Node类型根节点
  }

  insertNode(node, key) {
    if (this.compareFn(node.key, key) === Compare.LESS_THAN) {
      if (node.left) {
        this.insertNode(node.left, key)
      } else {
        node.left = new Node(key)
      }
    } else {
      if (node.right) {
        this.insertNode(node.right, key)
      } else {
        node.right = new Node(key)
      }
    }
  }

  // 插入新节点
  insert(key) {
    if (this.root) {
      this.insertNode(this.root, key)
    } else {
      this.root = new Node(key)
    }
  }

  // 在树中查找节点如果有就返回true如果没有就返回false
  search(key) {}

  // 通过中序遍历方式遍历所有节点
  inOderTraverse() {}

  // 通过先序遍历遍历所有节点
  preOrderTraverse() {}

  // 通过后续遍历遍历所有节点
  postOrderTraverse() {}

  // 返回树中最小值的key
  min() {}
  // 返回树中最大值的key
  max() {}

  // 移除树中某个key值
  remove() {}
}

const binaryTree = new BinarySearchTree()

binaryTree.insert(11)
binaryTree.insert(7)
binaryTree.insert(15)
binaryTree.insert(5)
binaryTree.insert(3)
binaryTree.insert(9)
binaryTree.insert(8)
binaryTree.insert(10)
binaryTree.insert(13)
binaryTree.insert(12)
binaryTree.insert(14)
binaryTree.insert(20)
binaryTree.insert(18)
binaryTree.insert(25)

console.log(binaryTree)
