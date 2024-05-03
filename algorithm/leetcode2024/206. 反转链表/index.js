// 206. 反转链表
// 简单
// 相关标签
// 相关企业
// 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

class ListNode {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

const head = new ListNode(1)
head.next = new ListNode(2)
head.next.next = new ListNode(3)
head.next.next.next = new ListNode(4)

function reverseList(head) {
  let curr = head
  let prev = null

  while (curr) {
    const temp = curr.next
    curr.next = prev
    prev = curr
    curr = temp
  }

  return prev
}

reverseList(head)
