// 第66题：加一
// 给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。
// 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。你可以假设除了整数 0 之外，这个整数不会以零开头。

// 输入: [1,2,3]
// 输出: [1,2,4]
// 解释: 输入数组表示数字 123。

function plusOne(digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i] = digits[i] + 1
      return digits
    }
    digits[i] = 0

    if (i === 0) {
      digits.unshift(1)
      return digits
    }
  }
}

console.log(plusOne([1, 2, 9]))
console.log(plusOne([9, 9, 9]))
