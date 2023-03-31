// 0 1 背包问题

const goods = [
  {
    wight: 1,
    value: 1,
  },
  {
    wight: 3,
    value: 2,
  },
  { wight: 4, value: 3 },
]

function getHighestValue(goods, packageWight) {
  const dp = [[]]
  dp[0][0] = 1
  dp[1][1] = 1

  for(let i = 1; i< goods.length; i++) {
    for(let j = 1; j < packageWight; j++) {
      dp[i][j] = Math.min()
    }
  }
}
