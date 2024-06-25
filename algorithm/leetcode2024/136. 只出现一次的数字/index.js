// 给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

// 你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。
// 一个数和 0 做 XOR 运算等于本身：a⊕0 = a
// 一个数和其本身做 XOR 运算等于 0：a⊕a = 0
// XOR 运算满足交换律和结合律：a⊕b⊕a = (a⊕a)⊕b = 0⊕b = b

/**
 * @param {number[]} nums
 * @return {number}
 */
function singleNumber(nums) {
	let result = 0
	for (let i = 0; i < nums.length; i++) {
		result = result ^ nums[i]
	}

	return result
}
console.log(singleNumber([2, 1, 1, 0, 2, 3, 3]))
