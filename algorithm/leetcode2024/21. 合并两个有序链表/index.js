// 代码
// 测试用例
// 测试结果
// 测试结果
// 21. 合并两个有序链表
// 简单
// 相关标签
// 相关企业
// 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

class ListNode {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

const list1 = new ListNode(1)
list1.next = new ListNode(2)
list1.next.next = new ListNode(3)

const list2 = new ListNode(3)
list2.next = new ListNode(4)
list2.next.next = new ListNode(5)

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoLists(list1, list2) {
  if(!list1 || !list2) return list1 || list2

  if(list1.value > list2.value) {
    list2.next = mergeTwoLists(list2.next, list1)
    return list2
  } else {
    list1.next = mergeTwoLists(list1.next, list2)
    return list1
  }
}

console.log(mergeTwoLists(list1, list2))
