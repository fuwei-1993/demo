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
 *
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @returns
 */
function check(p, q) {
  if (!q && !p) return true
  if (!q || !p) return false

  if (p.val === q.val) {
    return check(q.left, p.right) && check(q.right, p.left)
  }

  return false
}

function isSymmetric(root) {
  return check(root, root)
}

console.log(isSymmetric(root, root))

function isSymmetric2(root) {
  const queue = [root, root]

  while (queue.length) {
    const p = queue.shift()
    const q = queue.shift()

    if ((!p || !q) && p !== q) {
      return false
    }

    if (!p && !q) {
      continue
    }

    if (p.val === q.val) {
      queue.push(p.left)
      queue.push(q.right)

      queue.push(p.right)
      queue.push(q.left)
    } else {
      return false
    }
  }

  return true
}
