class TreeNode {
	constructor(val, left = null, right = null) {
		this.val = val
		this.left = left
		this.right = right
	}
}

/**
 *
 * @param {number[]} nums
 * @returns {TreeNode}
 */
function sortedArrayToBST(nums) {
	return helper(nums, 0, nums.length - 1)
}

function helper(nums, left, right) {
	if (right < left) return null

	const mid = Math.floor((left + right) / 2)
	const root = new TreeNode(nums[mid] ?? null)

	root.left = helper(nums, left, mid - 1)
	root.right = helper(nums, mid + 1, right)

	return root
}

console.log(sortedArrayToBST([1, 2, 3, 4, 5]))
