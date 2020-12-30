// 第70题：爬楼梯
// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。
// 你有多少种不同的方法可以爬到楼顶呢？ **注意：**给定 n 是一个正整数

// 输入： 2   输出： 2  解释： 有两种方法可以爬到楼顶。
// 1.  1 阶 + 1 阶
// 2.  2 阶

// 输入： 3   输出： 3  解释： 有三种方法可以爬到楼顶。
// 1.  1 阶 + 1 阶 + 1 阶
// 2.  1 阶 + 2 阶
// 3.  2 阶 + 1 阶

function climbStairs(n) {
  if (n === 1) return 1

  const dp = []
  dp[0] = 1
  dp[1] = 1

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }

  return dp[n]
}

console.log(climbStairs(8))

// 是不是很眼熟？ 没错 它就是斐波那契数列

function climbStairs2(n) {
  return n < 2 ? 1 : climbStairs2(n - 1) + climbStairs2(n - 2)
}

// 同类问题
// 银币的最小个数 银币有面额 1 4 5三种
function minCoins(n) {
  if (n < 4) return n
  if (n < 5) {
    return (n % 4) + n / 4
  }

  return minCoins(n % 5) + Math.floor(n / 5)
}

console.log(minCoins(21))
