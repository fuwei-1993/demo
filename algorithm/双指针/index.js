// 算法解释
// 双指针主要用于遍历数组，两个指针指向不同的元素，从而协同完成任务。也可以延伸到多
// 个数组的多个指针。
// 若两个指针指向同一数组，遍历方向相同且不会相交，则也称为滑动窗口（两个指针包围的
// 区域即为当前的窗口），经常用于区间搜索。
// 若两个指针指向同一数组，但是遍历方向相反，则可以用来进行搜索，待搜索的数组往往是
// 排好序的。

// 167. Two Sum II - Input array is sorted (Easy)
// 题目描述
// 在一个增序的整数数组里找到两个数，使它们的和为给定值。已知有且只有一对解。
// 输入输出样例
// 输入是一个数组（numbers）和一个给定值（target）。输出是两个数的位置，从 1 开始计数。
// Input: numbers = [2,7,11,15], target = 9
// Output: [1,2]
// 在这个样例中，第一个数字（2）和第二个数字（7）的和等于给定值（9）。

/**
 *
 * @param {number[]} numbers
 * @param {number} target
 */
function twoSum(numbers, target) {
  let l = 0,
    r = numbers.length - 1
  const sortNumbers = numbers.sort((a, b) => a - b)

  while (l <= r) {
    if (sortNumbers[l] + sortNumbers[r] > target) {
      r--
    } else if (sortNumbers[l] + sortNumbers[r] < target) {
      l++
    } else {
      break
    }
  }

  return [l + 1, r + 1]
}

console.log(twoSum([2, 7, 11, 15], 9))

// 88. Merge Sorted Array (Easy)
// 题目描述
// 给定两个有序数组，把两个数组合并为一个。
// 输入输出样例
// 输入是两个数组和它们分别的长度 m 和 n。其中第一个数组的长度被延长至 m + n，多出的
// n 位被 0 填补。题目要求把第二个数组归并到第一个数组上，不需要开辟额外空间。
// Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
// Output: nums1 = [1,2,2,3,5,6]

/**
 *
 * @param {number[]} number1
 * @param {number} m
 * @param {number[]} number2
 * @param {number} n
 */
function merge(number1, m, number2, n) {
  while (m > 0 && n > 0) {
    if (number1[m - 1] > number2[n - 1]) {
      number1[m + n - 1] = number1[m - 1]
      m--
    } else {
      number1[m + n - 1] = number2[n - 1]
      n--
    }
  }

  for (let i = 0; i < n; i++) {
    number1[i] = number2[i]
  }

  return number1
}

console.log(merge([1, 2, 3, 0, 0, 0], 3, [4, 5, 6], 3))

// 3.4 快慢指针
// 142. Linked List Cycle II (Medium)
// 题目描述
// 给定一个链表，如果有环路，找出环路的开始点。
// 输入输出样例
// 输入是一个链表，输出是链表的一个节点。如果没有环路，返回一个空指针。
// 图 3.1: 题目 142 - 输入样例
// 在这个样例中，值为 2 的节点即为环路的开始点。
// 如果没有特殊说明，LeetCode 采用如下的数据结构表示链表。
// struct ListNode {
// int val;
// ListNode *next;
// ListNode(int x) : val(x), next(nullptr) {}
// };

class Node {
  constructor(val) {
    this.val = val
    this.next = undefined
  }
}

class ListNode {
  head = null
}

const fistNode = new Node(1)
const secondNode = new Node(2)
const thirdNode = new Node(3)
fistNode.next = secondNode
secondNode.next = thirdNode
thirdNode.next = secondNode

const listNode = new ListNode()
listNode.head = fistNode

/**
 *
 * @param {ListNode} listNode
 */
function detectCycle(listNode) {
  let slow = listNode.head,
    fast = listNode.head

  do {
    if (!fast || !fast.next) return null
    fast = fast.next.next
    slow = slow.next
  } while (slow !== fast)

  fast = listNode.head

  while (slow !== fast) {
    fast = fast.next
    slow = slow.next
  }

  return fast
}

console.log(detectCycle(listNode))

// 3.5 滑动窗口
// 76. Minimum Window Substring (Hard)
// 题目描述
// 给定两个字符串 S 和 T，求 S 中包含 T 所有字符的最短连续子字符串的长度，同时要求时间
// 复杂度不得超过 O(n)。
// 输入输出样例
// 输入是两个字符串 S 和 T，输出是一个 S 字符串的子串。
// Input: S = "ADOBECODEBANC", T = "ABC"
// Output: "BANC"
// 在这个样例中，S 中同时包含一个 A、一个 B、一个 C 的最短子字符串是“BANC”。