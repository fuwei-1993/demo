// 题目14: 最长公共前缀
// 编写一个函数来查找字符串数组中的最长公共前缀。如果不存在公共前缀，则返回""
// 输入: ["flower","flow","flight"]
// 输出: "fl"

function longestCommonPrefix(strings) {
  let prefix = strings[0] // 先找一个基准元素
  for (let i = 0; i < strings.length; i++) {
    while (strings[i].indexOf(prefix) === -1) {
      prefix = prefix.substring(0, prefix.length - 1)
    }
    if (!prefix.length) return ''
  }
 
  return prefix
}

longestCommonPrefix(['flower', 'flow', 'flight'])
