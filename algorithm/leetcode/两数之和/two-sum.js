function twoSum(numbers, target) {
  const numMap = new Map()

  for (let i = 0; i < numbers.length; i++) {
    const num = target - numbers[i]
    if (numMap.has(num)) {
      return [numMap.get(num), i]
    } else {
      numMap.set(numbers[i], i)
    }
  }

  return []
}

const numbers = [2, 7, 2, 0, 11, 15],
  target = 9

console.log(twoSum(numbers, target))

function treeSum(numbers, target) {
  for(let i = 0; i < numbers.length; i++) {
    const num = target - numbers[i] 
    const twoNumbers = twoSum(numbers, num)
    if(twoNumbers.length && !(i in twoNumbers)) {
      return [i, ...twoNumbers]
    }
  }
  return []
}

console.log(treeSum(numbers, target)) 