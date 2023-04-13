// 硬币问题
// 假设我们有 n 种不同面额的硬币 ，列如 [1, 2, 3, 4] 组合成价值 m 求最小硬币数
// TODO..
// function calcMinNumOfCoins (coins, totalCount) {
//   const sortedCoins =  coins.sort()
//   const dp = Array.from(new Array(coins.length), () => new Array(totalCount).fill(0))
//   console.log(dp);

//   for(let i = 0; i < totalCount; i ++) {
//     for(let j = 0; j < sortedCoins.length; j++) {
//       dp[i][j] = dp[i][j - 1] ?  Math.min(dp[i][j - 1], xxxx) : xxxx
//     }
//   }
// }

// calcMinNumOfCoins([1, 2, 3, 4], 5)



// 假设我们有8种不同面值的硬币｛1，2，5，10，20，50，100，200｝，用这些硬币组合够成一个给定的数值n。
// 例如n=200，那么一种可能的组合方式为 200 = 3 * 1 + 1＊2 + 1＊5 + 2＊20 + 1 * 50 + 1 * 100.
// 问总过有多少种可能的组合方式？

// 动态规划的思路就是先把大问题拆分成n个小问题，最后再合并
