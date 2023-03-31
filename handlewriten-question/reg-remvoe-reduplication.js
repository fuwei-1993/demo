// Input: 'abcdaaabbccccdddefgaaa'
// Output: 4

// 1. 输出叠词的数量
// 2. 输出去重叠词的数量
// 3. 用正则实现

function removeReduplication(words) {
  const reg = new RegExp('(.)\\1+', 'g')
  const matched = words.match(reg)
  const withoutReduplication = words.replace(reg, '')


  return {
    count: matched.length,
    withoutReduplication: withoutReduplication
  }
}

removeReduplication('abcdaaabbccccdddefgaaa')

console.log('removeReduplication: ', removeReduplication('abcdaaabbccccdddefgaaa'));

