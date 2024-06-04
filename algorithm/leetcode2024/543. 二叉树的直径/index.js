// 给你一棵二叉树的根节点，返回该树的 直径 。

// 二叉树的 直径 是指树中任意两个节点之间最长路径的 长度 。这条路径可能经过也可能不经过根节点 root 。

// 两节点之间路径的 长度 由它们之间边数表示

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

// 暴力穷举。。
// 1169ms
// ms
// 击败
// 5.02%
// 😂

function diameterOfBinaryTree(root) {
  let maxDiameter = 0
  const queue = [root]

  while (queue.length) {
    const current = queue.shift()

    maxDiameter = Math.max(
      dfsCalcMaxLevel(current.left) + dfsCalcMaxLevel(current.right),
      maxDiameter
    )

    if (current.left) {
      queue.push(current.left)
    }

    if (current.right) {
      queue.push(current.right)
    }
  }

  function dfsCalcMaxLevel(root) {
    if (!root) return 0

    return Math.max(dfsCalcMaxLevel(root.left), dfsCalcMaxLevel(root.right)) + 1
  }
  return maxDiameter
}

console.log(diameterOfBinaryTree(root))

function diameterOfBinaryTree2() {}
