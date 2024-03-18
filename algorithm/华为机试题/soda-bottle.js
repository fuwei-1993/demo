// 描述
// 某商店规定：三个空汽水瓶可以换一瓶汽水，允许向老板借空汽水瓶（但是必须要归还）。
// 小张手上有n个空汽水瓶，她想知道自己最多可以喝到多少瓶汽水。
// 数据范围：输入的正整数满足
// 1
// ≤
// �
// ≤
// 100

// 1≤n≤100

// 注意：本题存在多组输入。输入的 0 表示输入结束，并不用输出结果。
// 输入描述：
// 输入文件最多包含 10 组测试数据，每个数据占一行，仅包含一个正整数 n（ 1<=n<=100 ），表示小张手上的空汽水瓶数。n=0 表示输入结束，你的程序不应当处理这一行。

// 输出描述：
// 对于每组测试数据，输出一行，表示最多可以喝的汽水瓶数。如果一瓶也喝不到，输出0。

// 动态规划
function getSodaCount(n) {
  const dp = []
  dp[0] = 0
  dp[1] = 0
  dp[2] = 1
  dp[3] = 1

  for (let i = 3; i <= n; i++) {
    dp[i] = Math.floor(i / 3) + dp[Math.floor(i / 3) + (i % 3)]
  }
  return dp[n]
}

console.log(getSodaCount(81))

// 递归
function getCount(n, result = 0) {
  if(n < 2) return result
  if(n <= 3) return result + 1
  const waterCount = Math.floor(n/3)
  const emptyBottle = waterCount + n%3

  return result + getCount(emptyBottle, waterCount)
}
console.log(getCount(81))
