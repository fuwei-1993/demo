// 第350题：两个数组的交集
// 给定两个数组，编写一个函数来计算它们的交集。

function intersect(numbers1, numbers2) {
  const numMap = {}
  const result = []
  for (let i = 0; i < numbers1.length; i++) {
    if (numMap[numbers1[i]]) {
      numMap[numbers1[i]]++
    } else {
      numMap[numbers1[i]] = 1
    }
  }

  for (let i = 0; i < numbers2.length; i++) {
    if (numMap[numbers2[i]]) {
      numMap[numbers2[i]]--
      if (!numMap[numbers2[i]]) {
        result.push(numbers2[i])
      }
    }
  }

  return result
}

console.log(intersect([1, 2, 3, 4], [3, 4, 5]))

//  题目在进阶问题中问道：如果给定的数组已经排好序呢？你将如何优化你的算法？我们分析一下，
//  假如两个数组都是有序的，分别为：arr1 = [1,2,3,4,4,13]，arr2 = [1,2,3,9,10]
// 双指针解法： 比较两个指针是否相等 不相等就后移小的那个 相等就装进数组

function intersect2(numbers1, numbers2) {
  let i = 0,
    j = 0,
    k = 0
  while (i < numbers1.length && j < numbers2.length) {
    if (numbers1[i] < numbers2[j]) {
      i++
    } else if (numbers1[i] > numbers2[j]) {
      j++
    } else if (numbers1[i] === numbers2[j]) {
      k++
      j++
      i++
    }
  }

  return numbers1.slice(0, k)
}

console.log(intersect2([1, 2, 3, 4, 4, 13], [1, 2, 3, 9, 10]))
