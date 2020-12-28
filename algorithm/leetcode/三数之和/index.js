// 第15题：三数之和
// 给你一个包含 n 个整数的数组 numbers numbers 中是否存在三个元素 a，b，c ，
// 使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。注意：答案中不可以包含重复的三元组。
// 给定数组 numbers = [-1,0,1,2,-1,-4,-2,-3,3,0,4]
// 满足要求的三元组集合为：
// [[-4,0,4],[-4,1,3],[-3,-1,4],[-3,0,3],[-3,1,2],[-2,-1,3],[-2,0,2],[-1,-1,2],[-1,0,1]]

// 利用双指针的问题来求解此问题
function threeSum(numbers) {
  const sortedNumbers = numbers.sort((a, b) => a - b)

  let result = []

  function steps(currentStep, step) {
    let stepNum = currentStep + step
    while (sortedNumbers[stepNum] === sortedNumbers[currentStep]) {
      stepNum += step
    }
    return stepNum
  }

  for (let i = 0; i < sortedNumbers.length; i++) {
    const fixedOne = sortedNumbers[i]
    let l = i + 1,
      r = sortedNumbers.length - 1

    if (fixedOne > 0) return result
    if (sortedNumbers[i] != sortedNumbers[i - 1]) {
      while (r > l) {
        if (sortedNumbers[r] + sortedNumbers[l] === -fixedOne) {
          result.push([fixedOne, sortedNumbers[l], sortedNumbers[r]])

          l = steps(l, 1)
          r = steps(r, -1)
        } else if (sortedNumbers[r] + sortedNumbers[l] < -fixedOne) {
          l++
        } else {
          r--
        }
      }
    }
  }
  return result
}

console.log(threeSum([-4, -2, -2, -2, 0, 1, 2, 2, 2, 3, 3, 4, 4, 6, 6]))
