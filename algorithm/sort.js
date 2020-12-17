function fisherYatesShuffle(arr) {
  // for (let i = 0; i < arr.length - 1; i++) {
  //   const j = i + Math.floor(Math.random() * (arr.length - i))
  //   [arr[i], arr[j]] = [arr[j], arr[i]]
  // }

  // return arr
  const i = 1
  const j = ((2)[(arr[0], arr[1])] = [arr[1], arr[0]])
  return arr
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8]

console.log(fisherYatesShuffle(arr))

// 插入排序 理论上是一个个插进新的数组

function insertSort(arr) {
  const result = arr.slice()

  for (let i = 1; i < arr.length; i++) {
    const curr = arr[i]
    let j = i - 1

    while (j >= 0 && curr < result[j]) {
      result[j + 1] = result[j]
      j--
    }
    result[j + 1] = curr
  }

  return result
}

console.log(insertSort([1, 2, 22, 1, 222, 33, 4, 5]))

// 二分插入排序
