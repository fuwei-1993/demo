// 硬币问题
// 假设我们有 n 种不同面额的硬币 ，列如 [1, 2, 3, 4] 组合成价值 m 求最小硬币数
// TODO..
// function calcMinNumOfCoins(coins, totalCount) {
//   const sortedCoins = coins.sort()
//   const dp = Array.from(new Array(totalCount), () =>
//     new Array(coins.length).fill(0)
//   )
//   for (let i = 0; i < totalCount; i++) {
//     for (let j = 0; j < sortedCoins.length; j++) {
//       if (i + 1 < sortedCoins[j]) {
//         dp[i][j] = j - 1 < 0 ? 0 : dp[i][j - 1]
//       } else {
//         const count = Math.floor((i + 1) / sortedCoins[j])
//         const value = count * sortedCoins[j]
//         console.log(value)
//         const currentCount = j - 1 < 0 ? 0 : dp[i + 1 - value][j - 1] + count

//         if (dp[i][j - 1] && currentCount) {
//           dp[i][j] = Math.min(dp[i][j - 1], currentCount)
//         } else {
//           dp[i][j] = currentCount
//         }
//       }
//     }
//   }
//   console.log(dp)

//   return dp[totalCount - 1][coins.length - 1]
// }

// calcMinNumOfCoins([1, 2, 3, 4], 5)
// console.log(
//   'calcMinNumOfCoins([1, 2, 3, 4], 5): ',
//   calcMinNumOfCoins([1, 2, 3, 4], 1)
// )

// 更简洁的思维方式
function calcMinNumOfCoins2(coins, totalCount) {

  if(!totalCount) return 0
  const sortCoins = coins.sort((a, b) => a - b)
  const dp = []
  for (let i = 0; i <= totalCount; i++) {
    if (!dp[i]) {
      dp[i] = []
    }
    for (let j = 0; j < sortCoins.length; j++) {
      if (!dp[i][j]) {
        dp[i][j] = 0
      }
      if (coins[j] > i) {
        dp[i][j] = j - 1 < 0 ? -1 : dp[i][j - 1]
      } else {
        const count = Math.floor(i / coins[j])
        const diffValue = i - count * coins[j]
        const prevCount = dp[i][j - 1]
        const current = dp[diffValue][j - 1]

        if(prevCount > 0 && current > 0) {
          dp[i][j] = Math.min(prevCount, current + count)
        } else {
          dp[i][j] = diffValue && i === totalCount ? -1 : count
        }
      }
    }
  }

  return dp[totalCount][coins.length - 1]
}

console.log(
  'calcMinNumOfCoins2: ',
  calcMinNumOfCoins2([186,419,83,408],
    6249)
)

// 假设我们有8种不同面值的硬币｛1，2，5，10，20，50，100，200｝，用这些硬币组合够成一个给定的数值n。
// 例如n=200，那么一种可能的组合方式为 200 = 3 * 1 + 1＊2 + 1＊5 + 2＊20 + 1 * 50 + 1 * 100.
// 问总过有多少种可能的组合方式？

// 动态规划的思路就是先把大问题拆分成n个小问题，最后再合并

function calcCombineCountOfCoins(coins, totalCount) {
  const dp = []
  for (let i = 0; i <= totalCount; i++) {
    if (!dp[i]) {
      dp[i] = []
    }
    for (let j = 0; j < coins.length; j++) {
      if (dp[i][j] === undefined) {
        dp[i][j] = 0
      }

      if (coins[j] > i) {
        dp[i][j] = j - 1 < 0 ? 0 : dp[i][j - 1]
      } else {
        let times = Math.floor(i / coins[j])
        let count = 0
        while (times > 0) {
          const remainder = i - times * coins[j]
          if (!remainder || dp[remainder][j - 1]) {
            count++
          }
          times--
        }
        dp[i][j] = (j - 1 > 0 ? dp[i][j - 1] : 0) + count
      }
    }
  }

  return dp[totalCount][coins.length - 1]
}

console.log(
  'calcCombineCountOfCoins([1,2,5,10,20,50,100,200],200): ',
  calcCombineCountOfCoins([1, 2, 5, 10, 20, 50, 100, 200], 200)
)
