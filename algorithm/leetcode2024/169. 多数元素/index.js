// 给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。

// 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
/**
 * @param {number[]} nums
 * @return {number}
 */

// 摩尔投票：

function majorityElement(nums) {
	let x = 0
	let votes = 0

	for (let i = 0; i < nums.length; i++) {
		if (votes === 0) x = nums[i]
		votes += x === nums[i] ? 1 : -1
	}
	return x
}
