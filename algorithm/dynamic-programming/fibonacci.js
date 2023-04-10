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
console.log('fibonacci(20): ', fibonacci(20));
console.timeEnd('fibonacci')


// 但是递归可以优化, 可以解决递归中的重复计算的问题
const cache = {}
function fibonacciCacheVersion(n) {
  if(n <= 2) return 1
  if(cache[n]) return cache[n]
  cache[n] = fibonacciCacheVersion(n - 2) + fibonacciCacheVersion(n - 1)
  return cache[n]
}

console.time('fibonacciCacheVersion')
console.log('fibonacciCacheVersion(20): ', fibonacciCacheVersion(20));
console.timeEnd('fibonacciCacheVersion')
