// 去除字符串中出现次数最少的字符，不改变原字符串的顺序。
// “ababac” —— “ababa”
// “aaabbbcceeff” —— “aaabbb”

function removeWords(target) {
  const calcWordsTimes = {}
  for (let i = 0; i < target.length; i++) {
    if (calcWordsTimes[target[i]]) {
      calcWordsTimes[target[i]] += 1
    } else {
      calcWordsTimes[target[i]] = 1
    }
  }

  const minTimes = Math.min.apply(null, Object.values(calcWordsTimes))
  const minWords = Object.keys(calcWordsTimes).filter(
    (v) => calcWordsTimes[v] === minTimes
  )

  let result = target

  minWords.forEach((w) => {
    result = result.replace(new RegExp(w, 'g'), '')
  })

  return result
}

console.log(removeWords('aaabbbcceeff'));
