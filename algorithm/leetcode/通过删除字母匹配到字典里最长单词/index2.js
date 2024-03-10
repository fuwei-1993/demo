// 524. 通过删除字母匹配到字典里最长单词
// 给定一个字符串和一个字符串字典，找到字典里面最长的字符串，该字符串可以通过删除给定字符串的某些字符来得到。
// 如果答案不止一个，返回长度最长且字典顺序最小的字符串。如果答案不存在，则返回空字符串。

// 示例 1:

// 输入:
;(s = 'abpcplea'), (d = ['ale', 'apple', 'monkey', 'plea'])

// 输出:
// "apple"
// 示例 2:

// 输入:
// s = "abpcplea", d = ["a","b","c"]

// 输出:
// "a"
/**
 * @param {string} s
 * @param {string[]} d
 * @return {string}
 */
function findLongestWord(s, d) {
  let result = ''
  for (let i = 0; i < d.length; i++) {
    let left = 0,
      right = 0

    while (left < s.length && right < d[i].length) {
      if (s[left] === d[i][right]) {
        right++
      }

      left++
    }
    if (right === d[i].length) {
      if (d[i].length > result.length) {
        result = d[i]
      } else if (d[i].length === result.length) {
        if (d[i] < result) {
          result = d[i]
        }
      }
    }
  }

  return result
}

console.log(findLongestWord(s, d))
