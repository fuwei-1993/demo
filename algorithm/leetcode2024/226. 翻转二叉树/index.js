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

// 深度优先
function invertTree(root) {
  if (!root) return root

  const left = invertTree(root.left)
  const right = invertTree(root.right)

  root.left = right
  root.right = left

  return root
}

// invertTree(root)

// 广度优先

function invertTree2(root) {
  if(!root) return root
  const queue = [root]

  while (queue.length) {
    const node = queue.shift()
    const temp = node.left
    node.left = node.right

    node.right = temp

    if(node.left) {
      queue.push(node.left)
    }
    if(node.right) {
      queue.push(node.right)
    }
  }

  return root
}

console.log(invertTree2(root))
