// 2.1 算法解释
// 顾名思义，贪心算法或贪心思想采用贪心的策略，保证每次操作都是局部最优的，从而使最
// 后得到的结果是全局最优的。
// 举一个最简单的例子：小明和小王喜欢吃苹果，小明可以吃五个，小王可以吃三个。已知苹
// 果园里有吃不完的苹果，求小明和小王一共最多吃多少个苹果。在这个例子中，我们可以选用的
// 贪心策略为，每个人吃自己能吃的最多数量的苹果，这在每个人身上都是局部最优的。又因为全
// 局结果是局部结果的简单求和，且局部结果互不相干，因此局部最优的策略也同样是全局最优的
// 策略。

// 2.2 分配问题
// 135. Candy (Hard)
// 题目描述
// 一群孩子站成一排，每一个孩子有自己的评分。现在需要给这些孩子发糖果，规则是如果一
// 个孩子的评分比自己身旁的一个孩子要高，那么这个孩子就必须得到比身旁孩子更多的糖果；所
// 有孩子至少要有一个糖果。求解最少需要多少个糖果。

// 输入输出样例
// 输入是一个数组，表示孩子的评分。输出是最少糖果的数量。
// Input: [1,0,2]
// Output: 5
/**
 *
 * @param {number[]} ratings
 * @returns {number}
 */
function candy(ratings) {
  const len = ratings.length
  if (len < 2) return len

  const cookies = new Array(len).fill(1)

  for (let i = 1; i < len; i++) {
    if (ratings[i] > ratings[i - 1]) {
      cookies[i] = cookies[i - 1] + 1
    }
  }

  for (let i = ratings.length - 1; i > 0; i--) {
    if (ratings[i - 1] > ratings[i]) {
      cookies[i - 1] = Math.max(cookies[i - 1], cookies[i] + 1)
    }
  }

  return cookies.reduce((a, b) => a + b)
}

console.log(candy([1, 3, 2, 2, 1]))

// 2.3 区间问题
// 435. Non-overlapping Intervals (Medium)
// 题目描述
// 给定多个区间，计算让这些区间互不重叠所需要移除区间的最少个数。起止相连不算重叠。
// 输入输出样例
// 输入是一个数组，数组由多个长度固定为 2 的数组组成，表示区间的开始和结尾。输出一个
// 整数，表示需要移除的区间数量。
// Input: [[1,2], [2,4], [1,3]]
// Output: 1
// 在这个样例中，我们可以移除区间 [1,3]，使得剩余的区间 [[1,2], [2,4]] 互不重叠。
/**
 *
 * @param {number[][]} intervals
 * @returns {number}
 */
function eraseOverlapIntervals(intervals) {
  if (!intervals.length) return 0

  const len = intervals.length
  const sortIntervals = intervals.sort((a, b) => a[1] - b[1])
  let total = 0,
    prev = sortIntervals[0][1]

  for (let i = 1; i < len; i++) {
    if (intervals[i][0] < prev) {
      total++
    } else {
      prev = intervals[i][1]
    }
  }
  return total
}

console.log(
  eraseOverlapIntervals([
    [1, 2],
    [2, 4],
    [1, 3],
  ])
)

