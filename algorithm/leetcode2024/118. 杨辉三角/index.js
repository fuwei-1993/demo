// 给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。

// 在「杨辉三角」中，每个数是它左上方和右上方的数的和。

//   1
//  1  1
// 1  2  1
//1  3  3  1
/**
 *
 * @param {number} numRows
 * @return {number[][]}
 */
function generate(numRows) {
	const dp = [[]]
	dp[0][0] = 1

	for (let i = 0; i < numRows; i++) {
		for (let j = 0; j <= i; j++) {
			if (!dp[i]) {
				dp[i] = []
			}
			if (j === 0 || j === i) {
				dp[i][j] = 1
			} else {
				dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
			}
		}
	}

	return dp
}

console.log(generate(5))
