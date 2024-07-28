// 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

// 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。

// 输入：nums = [100,4,200,1,3,2]
// 输出：4
// 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
// 示例 2：

// 输入：nums = [0,3,7,2,5,8,4,6,0,1]
// 输出：9

// 方法一超出时间限制
/**
 *
 * @param {number[]} nums
 */
function longestConsecutive(nums) {
	if (!nums.length) return 0
	const recordCountMap = {}

	for (let i = 0; i < nums.length; i++) {
		if (!recordCountMap[nums[i]]) {
			recordCountMap[nums[i]] = [nums[i]]
		}
	}

	const result = Object.keys(recordCountMap).reduce((result, curr) => {
		const nextNumberKey = Number(curr) + 1
		if (recordCountMap[nextNumberKey]) {
			recordCountMap[nextNumberKey].push(recordCountMap[curr])
		}
		return [recordCountMap[curr], ...result]
	}, [])

	return Math.max.apply(
		null,
		result.map((item) => item.flat(nums.length).length)
	)
}

/**
 *
 * @param {number[]} nums
 */
function longestConsecutive2(nums) {
	const numSet = new Set(nums)
	let result = 0

	for (const num of numSet) {
		if (!numSet.has(num - 1)) {
			let longestStreak = 1
			let current = num
			while (numSet.has(current + 1)) {
				longestStreak++
				current++
			}

			result = Math.max(result, longestStreak)
		}
	}

	return result
}

console.log(longestConsecutive2([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]))
