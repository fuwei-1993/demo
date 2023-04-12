// 四个月以前的题目
// 求下列数组中最长连续的数组
// 暴力求解

const target = [1, 5, 2, 4, 3]

function longestContinuosNum(numbers) {
  let start = 0
  let record = {}
  let len = 0
  while (start < numbers.length - 1) {
    const temp = numbers.slice(start)
    let [first, ...rest] = temp
    record[start] = [first]

    for (let i = 0; i < rest.length; i++) {
      if (rest[i] - first === 1) {
        record[start].push(rest[i])
        first = rest[i]
      }
    }
    len = Math.max(record[start].length, len)
    start++
  }
  return len
}

console.log('longestContinuosNum: ', longestContinuosNum(target))

// 那么动态规划如何解
/**
 * 1. 将问题单独细化
 * 2. 将每一个解累计组合起来求最终解（我也清楚描述起来非常抽象😄）
 */
// 再一次感叹牛皮的动态规划
/**     1,5,2,4,3
 *  [
 * 1   [1],
 * 5   [0,1],
 * 2   [2,0,1],
 * 4   [0,0,0,1],
 * 3   [3,0,2,0,1],
 *  ]
 */
function longestContinuosNumDp(numbers) {
  const dp = Array.from(new Array(numbers.length), () =>
    new Array(numbers.length).fill(0)
  )
  let maxLen = 0

  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j <= i; j++) {
      if (i === j) {
        dp[i][j] = dp[i][j] ? dp[i][j] : 1
      }
      if (numbers[i] - numbers[j] === 1) {
        dp[i][i] = dp[j][j] + 1
        maxLen = Math.max(dp[i][i], maxLen)
      }
    }
  }
  return maxLen
}

// 解到最后发现其实在用矩阵的方式求解 😂
console.log('longestContinuosNumDp(target): ', longestContinuosNumDp(target))
