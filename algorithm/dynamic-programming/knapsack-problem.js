// 0 1 背包问题

const goods = [
  { value: 4, size: 3 },
  { value: 5, size: 4 },
  { value: 10, size: 7 },
  { value: 11, size: 8 },
  { value: 13, size: 9 },
]

/**
 *        1,2,3,4
 *[
  w1,v1  [1,1,1,1]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       ],
  w3,v2  [1],
  w4,v3  [1]
 ]
 *
 */

function makeTwoDimensionalArray(inner, outer) {
  return Array.from(new Array(outer), () => new Array(inner).fill(0))
}

function getHighestValue(goods, packageWight) {
  const dp = makeTwoDimensionalArray(packageWight, goods.length)

  for (let i = 0; i < goods.length; i++) {
    for (let j = 0; j < packageWight; j++) {
      if (goods[i].size > j + 1) {
        dp[i][j] = dp[i - 1 < 0 ? 0 : i - 1][j]
      } else {
        // 取上一个物品时 为0时就代表没有，不能去取第一个物品
        dp[i][j] = Math.max(
          i - 1 < 0 ? 0 : dp[i - 1][j],
          ((i - 1 < 0 ? 0 : dp[i - 1][j - goods[i].size]) ?? 0) + goods[i].value
        )
      }
    }
  }

  return dp[goods.length - 1][packageWight - 1] ?? 0
}

console.log('getHighestValue(goods, 8): ', getHighestValue(goods, 9))

