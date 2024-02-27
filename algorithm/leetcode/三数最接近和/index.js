// 16. 最接近的三数之和
// 尝试过
// 中等
// 相关标签
// 相关企业
// 给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。

// 返回这三个数的和。

// 假定每组输入只存在恰好一个解。



// 示例 1：

// 输入：nums = [-1,2,1,-4], target = 1
// 输出：2
// 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
// 示例 2：

// 输入：nums = [0,0,0], target = 1
// 输出：0


function threeSumClosest(nums, target) {
  const len = nums.length
  nums.sort((a, b) => a - b)
  let result = Number.MAX_SAFE_INTEGER

  for(let i = 0; i< len; i++) {
      const num = nums[i]
      let left = i + 1
      let right = len - 1


      while(left < right) {
         const sum = num + nums[left] + nums[right]
          if(Math.abs(sum - target) < Math.abs(result - target) ) result = sum

          if(sum > target) {
              right--
          } else if(sum < target) {
              left++
          } else {
              return sum
          }

      }
  }
  return result
};