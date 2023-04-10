// 动态规划
// 动态规划有时为什么被认为是一种与递归相反的技术呢？是因为递归是从顶部开始将问题分解，通过解决掉所有分解出小问题的方式，来解决整个问题。
// 动态规划解决方案从底部开始解决问题，将所有小问题解决掉，然后合并成一个整体解决方案，从而解决掉整个大问题。
// 使用递归去解决问题虽然简洁，但效率不高。包括 JavaScript 在内的众多语言，不能高效地将递归代码解释为机器代码，尽管写出来的程序简洁，但是执行效率低下。
// 但这并不是说使用递归是件坏事，本质上说，只是那些指令式编程语言和面向对象的编程语言对递归 的实现不够完善，因为它们没有将递归作为高级编程的特性。

function fibonacci(n) {
  if (n <= 2) return 1
  return fibonacci(n - 2) + fibonacci(n - 1)
}

console.time('fibonacci')
console.log('fibonacci(20): ', fibonacci(20))
console.timeEnd('fibonacci')

// 但是递归可以优化, 可以解决递归中的重复计算的问题
const cache = {}
function fibonacciCached(n) {
  if (n <= 2) return 1
  if (cache[n]) return cache[n]
  cache[n] = fibonacciCached(n - 2) + fibonacciCached(n - 1)
  return cache[n]
}

console.time('fibonacciCached')
console.log('fibonacciCached(50): ', fibonacciCached(50))
console.timeEnd('fibonacciCached')

// 动态规划
function fibonacciDp(n) {
  if (n <= 2) return 1
  const dp = []
  dp[0] = 1
  dp[1] = 1

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }

  return dp[n - 1]
}

// 速度比给了缓存的递归还快
// 恐怖如斯
console.time('fibonacciDp')
console.log('fibonacciDp(50): ', fibonacciDp(50))
console.timeEnd('fibonacciDp')

// 优化空间复杂度
function fibonacciDp2(n) {
  if (n <= 2) return 1
  let first = 1,
    second = 1

  for (let i = 2; i <= n; i++) {
    second = first + second
    first = second - first
  }
  return first
}
// 速度比上面还恐怖如斯
console.time('fibonacciDp2')
console.log('fibonacciDp2(50): ', fibonacciDp2(50))
console.timeEnd('fibonacciDp2')

// fibonacci(20):  6765
// fibonacci: 5.451ms
// fibonacciCached(50):  12586269025
// fibonacciCached: 0.163ms
// fibonacciDp(50):  12586269025
// fibonacciDp: 0.127ms
// fibonacciDp2(50):  12586269025
// fibonacciDp2: 0.085ms