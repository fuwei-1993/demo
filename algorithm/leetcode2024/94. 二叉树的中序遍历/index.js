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

/**
 * 完成二叉树的中序遍历
 * @param {TreeNode} root
 * @return {number[]}
 */
const inorderTraversal = function (root, result = []) {
  if (!root) return []
  if (root.left) {
    inorderTraversal(root.left, result)
  }

  result.push(root.val)

  if (root.right) {
    inorderTraversal(root.right, result)
  }

  return result
}

console.log(inorderTraversal(root))
