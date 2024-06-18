// 35. 搜索插入位置
// 简单
// 相关标签
// 相关企业
// 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

// 请必须使用时间复杂度为 O(log n) 的算法。

// 输入: (nums = [1, 3, 5, 6]), (target = 5)
// 输出: 2

// 示例 2:

// 输入: nums = [1,3,5,6], target = 2
// 输出: 1
// 示例 3:

// 输入: nums = [1,3,5,6], target = 7
// 输出: 4
/**
 *
 * @param {number[]} nums
 * @param {number} target
 */
function searchInsert(nums, target) {
	let left = 0
	let right = nums.length - 1
	let mid
	if (nums[left] >= target) return left
	if (nums[right] < target) return right + 1

	while (left + 1 < right) {
		mid = Math.floor((left + right) / 2)
		if (nums[mid] >= target) {
			right = mid
		} else {
			left = mid
		}
	}
	return left + 1
}
console.log(searchInsert([1, 3, 5, 6], 2))
