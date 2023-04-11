// 另一个适合使用动态规划去解决的问题是寻找两个字符串的最长公共子串。例如，在单词 raven 和 havoc中，最长的公共子串是“av”。
// 寻找最长公共子串常用于遗传学中，用于使用核苷酸中碱基的首字母对DNA分子进行描述。
// 获取x两个字符串的最长公共部分

// 此方法是求最长连续的公共字符串
// 暴力求解
function getLongestCommonStr(str1, str2) {
  let len = 0,
    maxLen = 0,
    n = 0

  while (str1.length - n > Math.max(maxLen, len)) {
    for (let i = n; i < str1.length; i++) {
      for (let j = 0; j < str2.length; j++) {
        if (str1[i] === str2[j]) {
          i++
          len++
        } else {
          if (len) {
            maxLen = Math.max(maxLen, len)
            j = 0
            len = 0
          }
        }
      }
    }
    n++
  }

  return Math.max(maxLen, len)
}

console.log(
  `getLongestCommonStr('acbcbcef', 'abcbced'): `,
  getLongestCommonStr('acbcbcef', 'abcbced')
)

// 动态规划
// 利用上一次的相交值如果是连续的记录下来
function getLongestCommonStrDp(str1, str2) {
  const dp = []
  let longestCommonStr = 0

  for (let i = 0; i < str1.length; i++) {
    if (!dp[i]) {
      dp[i] = []
    }
    for (let j = 0; j < str2.length; j++) {
      if (str1[i] === str2[j]) {
        if (i > 1 && j > 1) {
          dp[i][j] = dp[i - 1][j - 1] + 1
          longestCommonStr = Math.max(longestCommonStr, dp[i][j])
        } else {
          dp[i][j] = 1
        }
      } else {
        dp[i][j] = 0
      }
    }
  }

  return longestCommonStr
}

getLongestCommonStrDp('acbcbcef', 'abcbced')
console.log(
  `getLongestCommonStrDp('acbcbcef', 'abcbced'): `,
  getLongestCommonStrDp('acbcbcef', 'abcbced')
)
