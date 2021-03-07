
/**
 * js 的大数相加
 * @param {number} number1 
 * @param {number} number2 
 */
function add(number1, number2) {
  let len1 = number1.length,
    len2 = number2.length,
    num = 0,
    arr = [],
    result
  while (len1 > 0 && len2 > 0) {
    let curr = number1[len1 - 1] - 0 + (number2[len2 - 1] - 0)
    if (curr <= 9) {
      arr.unshift(curr + num)
      num = 0
    } else {
      arr.unshift((curr % 10) + num)
      num = Math.floor(curr / 10)
    }
    len1--
    len2--
  }
  result = arr.join('')
  if (len1 > 0) result = number1.slice(0, len1) + result
  if (len2 > 0) result = number2.slice(0, len2) + result

  return result
}

console.log(
  add('1700000000000000000000000000000000000000000000000', '123333333333')
)
