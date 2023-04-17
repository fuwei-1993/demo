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
// TODO.. 没有限制物品拿取的次数


function getHighestValue(goods, packageWight) {
  const dp = Array.from(new Array(goods.length), () =>
    new Array(packageWight).fill(0)
  )

  for (let i = 0; i < goods.length; i++) {
    for (let j = 0; j < packageWight; j++) {
      if (goods[i].size > j + 1) {
        dp[i][j] = dp[i - 1 < 0 ? 0 : i - 1][j]
      } else {
        dp[i][j] = Math.max(
          dp[i - 1 < 0 ? 0 : i - 1][j],
          (dp[i - 1 < 0 ? 0 : i - 1][j - goods[i].size] ?? 0) + goods[i].value
        )
      }
    }
  }

  console.log(dp)

  return dp[goods.length - 1][packageWight - 1] ?? 0
}

console.log('getHighestValue(goods, 8): ', getHighestValue(goods, 9))
