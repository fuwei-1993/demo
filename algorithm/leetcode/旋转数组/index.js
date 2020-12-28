// 题目189: 旋转数组
// 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。
// 输入: [1,2,3,4,5,6,7] 和 k = 3
// 输出: [5,6,7,1,2,3,4]

// 这是史上最笨的办法
function reverse(numbers, k) {
  for(let i = 0; i < k; i++) {
    numbers.unshift(numbers.pop())
  }
  return numbers
}

console.log(reverse([1,2,3,4,5,6,7], 3))