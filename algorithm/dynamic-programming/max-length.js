// 四个月以前的题目
// 求下列数组中最长连续的数组
// 暴力求解

const target = [1, 5, 2, 4, 3]

function longestContinuosNum(numbers) {
  let start = 0
  let record = {}
  let len = 0
  while (start < numbers.length - 1) {
    const temp = numbers.slice(start)
    let [first, ...rest] = temp
    record[start] = [first]

    for (let i = 0; i < rest.length; i++) {
      if (rest[i] - first === 1) {
        record[start].push(rest[i])
        first = rest[i]
      }
    }
    len = Math.max(record[start].length, len)
    start++
  }
  return len
}

console.log('longestContinuosNum: ', longestContinuosNum(target))
