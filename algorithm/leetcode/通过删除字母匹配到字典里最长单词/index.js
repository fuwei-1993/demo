// 524. 通过删除字母匹配到字典里最长单词
// 给定一个字符串和一个字符串字典，找到字典里面最长的字符串，该字符串可以通过删除给定字符串的某些字符来得到。
// 如果答案不止一个，返回长度最长且字典顺序最小的字符串。如果答案不存在，则返回空字符串。

// 示例 1:

// 输入:
// s = "abpcplea", d = ["ale","apple","monkey","plea"]

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
  for (let i = 0, j = 0, k = 0; i < d.length; i++) {
    while (d[i].length > j && s.length > k) {
      if (s[k] === d[i][j]) {
        if (j === d[i].length - 1) {
          if (
            d[i].length > result.length ||
            (d[i].length === result.length && d[i] < result)
          ) {
            result = d[i]
          }
        }
        j++
        k++
      } else {
        k++
      }
    }
    j = 0
    k = 0
  }
  return result
}

console.log(findLongestWord('abpcplea', ['a', 'b', 'c']))
