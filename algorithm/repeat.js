function repeat(str, times) {
  let result = ''
  function inner(times) {
    if (times < 1) return str
    times--
    result += str
    inner(times)
    return result
  }

  inner(times)
  return result
}

console.log(repeat('a', 5))
