// 160. 相交链表
// 简单
// 相关标签
// 相关企业
// 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。

// 图示两个链表在节点 c1 开始相交：

class ListNode {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

const headA = new ListNode(1)
headA.next = new ListNode(2)
headA.next.next = new ListNode(3)

const headB = new ListNode(1)
headB.next = new ListNode(2)
headB.next.next = headA.next.next

/**
 * - 1 -> 2 -> 3 | 1 -> 2 -> 3 -> 4
 * - 1 -> 2 -> 3 -> 4 | 1 -> 2 -> 3
 * - 走到尽头见不到你，于是走过你来时的路，等到相遇时才发现，你也走过我来时的路。
 */
function getIntersectionNode(headA, headB) {
  let a = headA,
    b = headB

  while (a !== b) {
    a = a === null ? headB : a.next
    b = b === null ? headA : b.next
  }
  return a
}

console.log(getIntersectionNode(headA, headB))
