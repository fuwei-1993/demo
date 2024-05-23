// 283. 移动零
// 简单
// 相关标签
// 相关企业
// 提示
// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

// 请注意 ，必须在不复制数组的情况下原地对数组进行操作。

// 示例 1:

// 输入: nums = [0,1,0,3,12]
// 输出: [1,3,12,0,0]
/**
 * @description 双指针
 *  1. [0, 1, 0, 3,12]
    2. [1,1, 0, 3, 12]
    3. [1,3, 0, 3, 12]
    4. [1,3, 12, 3, 12]
    5. [1,3, 12, 0, 0]
 * @param {number[]} nums
 */
function moveZeroes(nums) {
  let j = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[j++] = nums[i]
    }
  }
  for (; j < nums.length; j++) {
    nums[j] = 0
  }
  return nums
}

console.log(moveZeroes([0, 1, 0, 3, 12]))

/**
 * @description 双指针，快速排序
 *  1. [0, 1, 0, 3,12]
    2. [1 ,0, 0, 3, 12]
    3. [1,3, 0, 0, 12]
    4. [1,3, 12, 0, 0]
 * @param {number[]} nums
 * @returns
 */
function moveZeroes2(nums) {
  for (let i = 0, j = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      const temp = nums[j]
      nums[j] = nums[i]
      nums[i] = temp
      j++
    }
  }

  return nums
}

console.log(moveZeroes2([0, 1, 0, 3, 12]))

function moveZeroes3(nums) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[j] !== 0) {
          nums[i] = nums[j]
          nums[j] = 0
          break
        }
      }
    }
  }
  return nums
}
console.log(moveZeroes3([0, 1, 0, 3, 12]))

function moveZeroes4(nums) {
  let j = 0

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[j++] = nums[i]
    }
  }

  for (; j < nums.length; j++) {
    nums[j] = 0
  }
  return nums
}

console.log(moveZeroes4([0, 1, 0, 3, 12]))

function moveZeroes5(nums) {
  for (let i = 0, j = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      if (j < i) {
        nums[j] = nums[i]
        nums[i] = 0
      }
      j++
    }
  }

  return nums
}

console.log(moveZeroes5([0, 1, 0, 3, 12]))
