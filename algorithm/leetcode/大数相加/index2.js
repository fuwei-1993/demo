function add(num1, num2) {
  let len1 = num1.length - 1
  let len2 = num2.length - 1
  let carry = 0
  const result = []

  while (len1 >= 0 || len2 >= 0 || carry) {
    const sum = (num1[len1] || 0) - 0 + ((num2[len2] || 0) - 0) + carry
    if (sum > 9) {
      carry = Math.floor(sum / 10)
      result.unshift(sum % 10)
    } else {
      result.unshift(sum)
      carry = 0
    }

    len1--
    len2--
  }

  return result.join('')
}

console.log(add('1999999999', '101'))
