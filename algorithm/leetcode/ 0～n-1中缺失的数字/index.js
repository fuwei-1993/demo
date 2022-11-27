// 剑指 Offer 53 - II. 0～n-1中缺失的数字
// 一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内。在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。



// 示例 1:

// 输入: [0,1,3]
// 输出: 2
// 示例 2:

// 输入: [0,1,2,3,4,5,6,7,9]
// 输出: 8

function missingNumber(numbers) {
  let start = 0, end = numbers.length - 1


  while(start <= end) {
    let mid = Math.floor((end + start)/2)
    if(mid === start) return start
  }

  return null
}

function missingNumber2(numbers) {
  const result = []
  numbers.forEach(n => {
    result[n] = n
  })

  let start = 0
  let end = result.length - 1

  // 双指针查询
  while(start < end) {
    if(result[start] === undefined) {
      return start
    } else {
      start ++
    }
    if(result[end] === undefined) {
      return end
    } else {
      end --
    }

  }

  return null

  // return result.findIndex(i => i === undefined)
}

const numbers = [...(new Array(1000000).keys())]

numbers.splice(Math.random() * 1000000, 1, undefined)

console.time('time')
console.log(missingNumber2(numbers))
console.timeEnd('time')