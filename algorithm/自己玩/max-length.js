// 求下列数组中最长连续的数组
// 暴力求解

const target = [1, 5, 2, 4, 3]
let maxLen = 0

const findMaxLen = (target, result = []) => {
  const first = target[0]
  for (let i = 1; i < target.length; i++) {
    const element = target[i]
    if (first < element) {
      if (result.length === 0) {
        result.push(first)
      }
      maxLen = Math.max(
        findMaxLen(target.slice(i), [...result, element]).length,
        maxLen
      )
    }
  }
  return result
}

for (let index = 0; index < target.length - 2; index++) {
  findMaxLen(target.slice(index))
}

// 记忆化搜索
const numbers = [1, 5, 2, 4, 3]
const memo = {}
const findMaxLen2 = (numbers, i) => {
  if (memo[i]) return memo[i]
  let maxLen = 1

  for (let j = i + 1; j < numbers.length; j++) {
    if (numbers[i] < numbers[j]) {
      maxLen = Math.max(maxLen, findMaxLen2(numbers, j) + 1)
    }
  }
  memo[i] = maxLen
  return maxLen
}

for (let index = 0; index < numbers.length - 1; index++) {
  console.log(findMaxLen2(numbers, index))
}

// TODO..
// 动态规划
const lengthOfList = (numbers) => {
  const n = numbers.length
  const len = new Array(n).fill(1)

  for (let i = n - 1; i >= 0; i--) {
    for (let j = 0; j < n - i + 1; j++) {
      len[i] = Math.max(len[i], len[j] + 1)
    }
  }

  console.log(len)
}

lengthOfList([1, 5, 2, 4, 3])
