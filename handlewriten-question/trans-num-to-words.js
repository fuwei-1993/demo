//  写出一个函数trans，将数字转换成汉语的输出，输入为不超过10000亿的数字

// trans(123456) —— 十二万三千四百五十六
// trans（100010001）—— 一亿零一万零一

function transNumToWords(num) {
  const numStr = `${num}`
  if (numStr.length >= 13) {
    console.log('请输入正确的数字')
    return
  }
  const wordsSet = [
    '零',
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九',
    '十',
  ]

  const bits = [
    '十',
    '百',
    '千',
    '万',
    '十',
    '百',
    '千',
    '亿',
    '十',
    '百',
    '千',
  ]

  if (num <= 10) {
    return wordsSet[num]
  }

  let rightPoint = numStr.length - 2
  let resultWords = wordsSet[numStr[numStr.length - 1]]
  let bitPoint = 0

  const handleWords = (currWord, bit, resultWords) => {
    if (currWord === '一' && bit === '十') {
      return bit + resultWords
    } else if (currWord === '零' && resultWords[0] === '零') {
      return resultWords
    } else if (resultWords === '零') {
      return currWord + bit
    } else if (currWord === '零') {
      return currWord + resultWords
    }

    return currWord + bit + resultWords
  }

  while (rightPoint >= 0) {
    resultWords = handleWords(wordsSet[numStr[rightPoint]], bits[bitPoint], resultWords)
    rightPoint--
    bitPoint++
  }

  return resultWords
}

console.log('transNumToWords(123456): ', transNumToWords(123456))
console.log('transNumToWords(100010001): ', transNumToWords(100010001))
