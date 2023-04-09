// AVL->
// 高度平衡树 是解决二叉树不断的添加在边界条件的时候产生性能问题而诞生的一种树结构

// 在计算机科学中，AVL树是最先发明的自平衡二叉查找树。在AVL树中任何节点的两个子树的高度最大差别为1，所以它也被称为高度平衡树。增加和删除可能需要通过一次或多次树旋转来重新平衡这个树。
// AVL树本质上还是一棵二叉搜索树，它的特点是： [1]
// 1.本身首先是一棵二叉搜索树。
// 2.带有平衡条件：每个结点的左右子树的高度之差的绝对值（平衡因子）最多为1。
// 也就是说，AVL树，本质上是带了平衡功能的二叉查找树（二叉排序树，二叉搜索树）

const BalanceFactor = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  UNBALANCED_LEFT: -1,
  SLIGHTLY_UNBALANCED_LEFT: -2,
}

class AvlTree {
  getNodeHeight(node) {
    if (!node) {
      return -1
    }
    return (
      Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) +
      1
    )
  }
}
