// 234. 回文链表
// 简单
// 相关标签
// 相关企业
// 给你一个单链表的头节点 head ，请你判断该链表是否为
// 回文链表
// 。如果是，返回 true ；否则，返回 false 。

class ListNode {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

const head = new ListNode(1)
head.next = new ListNode(2)
head.next.next = new ListNode(2)
head.next.next.next = new ListNode(1)

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  const values = []
  let result = true
  let currentNode = head

  while (currentNode) {
    values.push(currentNode.value)
    currentNode = currentNode.next
  }

  let left = 0
  let right = values.length - 1

  while (left < right) {
    if (values[left] !== values[right]) {
      result = false
    }
    left++
    right--
  }

  return result
}

console.log(isPalindrome(head))
