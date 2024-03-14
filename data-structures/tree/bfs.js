/**
 * 广度优先遍历
 * 「层序遍历 level-order traversal」从顶部到底部逐层遍历二叉树，并在每一层按照从左到右的顺序访问节点。
层序遍历本质上属于「广度优先遍历 breadth-first traversal」，也称「广度优先搜索 breadth-first search, BFS」，它体现了一种“一圈一圈向外扩展”的逐层遍历方式。
 *        1
 *   2        3
 * 4    5   6   7
 */

class Node {
  constructor(key) {
    this.key = key // 节点值
    this.left = null // 左侧子节点引用
    this.right = null // 右侧子节点引用
  }
}

const tree = new Node(1)
tree.left = new Node(2)
tree.right = new Node(3)
tree.left.left = new Node(4)
tree.left.right = new Node(5)
tree.right.left = new Node(6)
tree.right.right = new Node(7)

const levelOrder = (root) => {
  const queue = [root]
  const list = []

  while (queue.length) {
    const node = queue.shift()
    list.push(node.key)
    if (node.left) {
      queue.push(node.left)
    }
    if (node.right) {
      queue.push(node.right)
    }
  }
  return list
}

console.log(levelOrder(tree))
