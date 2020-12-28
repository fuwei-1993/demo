// 题目27：移除元素
// 给定一个数组 numbers 和一个值 val，你需要原地移除所有数值等于 val 的元素，返回移除后数组的新长度。
// 不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。

// 元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

function removeElement(numbers, val) {
  for(let i = 0; i < numbers.length; i++) {
    if(numbers[i] === val) {
      numbers.splice(i,1)
      i--
    }
  }
  return numbers.length
}

console.log(removeElement([3,2,3,3,2,3], 3))

// 题目26：删除排序数组中的重复项
// 给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次。
// 返回移除后数组的新长度。不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。

function removeDuplicates(numbers) {
  for(let i = 0; i < numbers.length - 1; i++) {
    if(numbers[i] === numbers[i + 1]) {
      numbers.splice(i,1)
      i--
    }
  }
  return numbers.length
}

console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4]))