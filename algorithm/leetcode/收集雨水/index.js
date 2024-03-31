// 取出栈顶的元素
// 单调栈
function peek(stack) {
  return stack[stack.length - 1]
}
function trap(heights) {
  // 高度数组小于2时无法收集雨水
  if (heights.length <= 2) return 0
  // 用栈记录高度数组索引
  const stack = [0]
  let result = 0
  for (let i = 1; i < heights.length - 1; i++) {
    // 当栈顶的元素高度小于数组高度，我们认为可以收集雨水了
    while (heights[i] > heights[peek(stack)]) {
      // 记录当前栈顶元素
      const prev = peek(stack)
      // 需要和栈上一位做比较
      stack.pop()
      if (!stack.length) {
        break
      }
      // 记录栈上一位索引
      const left = peek(stack)
      // 雨水宽度就等于当前索引减去栈上一位索引减1。例如：4 到 0 区间宽度为3
      const width = i - left - 1
      // 雨水宽度由最小高度决定，（木桶效应）
      const height = Math.min(heights[i], heights[left]) - heights[prev]
      // 累加雨水面积
      result += height * width
    }
    // push无法收集雨水的元素
    stack.push(i)
  }
  return result
}

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))
