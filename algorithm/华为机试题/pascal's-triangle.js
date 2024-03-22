// 杨辉三角
function createPascalTriangle(n) {
  let rowCount = 1
  let result = []
  for (let i = 0; i < n; i++) {
    let record = []
    let valueStart = n - i
    for (let j = 1; j <= rowCount; j++) {
      let pos = valueStart + j - 2
      if (i === 0) {
        record[pos] = 1
      } else {
        record[pos] =
          (result?.[i - 1]?.[pos] ?? 0) +
          (result?.[i - 1]?.[pos - 1] ?? 0) +
          (result?.[i - 1]?.[pos + 1] ?? 0)
      }
    }
    result.push(record)
    rowCount += 2
  }
  return result
}

createPascalTriangle(3)
