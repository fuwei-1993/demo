// 第15题：三数之和
// 给你一个包含 n 个整数的数组 numbers numbers 中是否存在三个元素 a，b，c ，
// 使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。注意：答案中不可以包含重复的三元组。
// 给定数组 numbers = [-1, 0, 1, 2, -1, -4]，
// 满足要求的三元组集合为：
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]

// 利用双指针的问题来求解此问题
function threeSum(numbers) {
  const sortedNumbers = numbers.sort((a, b) => a - b)
  let l,
    r = numbers.length - 1,
    result = []

  function steps(currentStep, step) {
    let stepNum = currentStep + step
    while (sortedNumbers[stepNum] === sortedNumbers[currentStep]) {
      stepNum += step
    }
    return stepNum
  }

  for (let i = 0; i < numbers.length; i++) {
    const fixedOne = sortedNumbers[i]
    l = i + 1

    if (fixedOne > 0) return result
    if (sortedNumbers[i] === sortedNumbers[i + 1]) {
      i++
    }
    while (r > l) {
      if (fixedOne + sortedNumbers[r] + sortedNumbers[l] > 0) {
        r = steps(r, -1)
      } else if (fixedOne + sortedNumbers[r] + sortedNumbers[l] < 0) {
        l = steps(l, 1)
      } else {
        result.push([fixedOne, sortedNumbers[l], sortedNumbers[r]])
        l = steps(l, 1)
      }
    }
  }
  return result
}

console.log(threeSum([-1, 0, 1, 1, 2, -1, -1, -1, -4]))
