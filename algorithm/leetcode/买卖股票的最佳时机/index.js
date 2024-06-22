// 第122题：买卖股票的最佳时机 II
// 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
// 如果你最多只允许完成一笔交易（即买入和卖出一支股票），
// 设计一个算法来计算你所能获取的最大利润。注意你不能在买入股票前卖出股票。
// 输入: [7,1,5,3,6,4]
// 输出: 7
// 解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
// 随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
// 注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。
// ​因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。

function make(length) {
	const result = []
	for (let i = 0; i < length; i++) {
		result.push([])
	}
	return result
}

function maxProfit(prices) {
	if (prices.length < 2) return 0
	const dp = make(prices.length)
	dp[0][0] = 0
	dp[0][1] = -prices[0]

	for (let i = 1; i < prices.length; i++) {
		dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
		dp[i][1] = Math.max(dp[i - 1][0] - prices[i], dp[i - 1][1])
	}
	console.log(dp)
	return dp[prices.length - 1][0]
}

console.log(maxProfit([1, 2, 3, 4, 5, 6, 7]))
console.log(maxProfit([7, 1, 5, 3, 6, 4]))

// 由于上面的方法过于不好理解 所以写了第二种
function maxProfit2(prices) {
	if (prices.length < 2) return 0
	let price = -prices[0]
	let earnedMoney = 0
	for (let i = 1; i < prices.length; i++) {
		if (price + prices[i] > 0) {
			earnedMoney += price + prices[i]
		}

		price = -prices[i]
	}

	return earnedMoney
}
console.log(maxProfit2([1, 2, 3, 4, 5, 6, 7]))
console.log(maxProfit2([7, 1, 5, 3, 6, 4]))
