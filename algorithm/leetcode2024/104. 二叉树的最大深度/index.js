/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val
    this.left = left
    this.right = right
  }
}

const root = new TreeNode(1)

root.left = new TreeNode(2)
root.right = new TreeNode(3)

root.left.left = new TreeNode(4)
root.left.right = new TreeNode(5)

root.right.left = new TreeNode(6)
root.right.right = new TreeNode(7)

// 方法一 广度优先
function maxDepth(root) {
  let depth = 0
  if (!root) return depth

  const dfs = (nodes) => {
    if (!nodes.length) return
    depth++
    const queue = [...nodes]
    const children = []
    while (queue.length) {
      const node = queue.shift()
      if (node.left) {
        children.push(node.left)
      }

      if (node.right) {
        children.push(node.right)
      }
    }

    dfs(children)
  }

  dfs([root])

  return depth
}

console.log(maxDepth(root))

// 方法二 深度优先

function maxDepth1 (root) {
  if(!root) return 0
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}

console.log(maxDepth1(root))