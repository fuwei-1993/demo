// 算法解释
// 二分查找也常被称为二分法或者折半查找，每次查找时通过将待查找区间分成两部分并只取
// 一部分继续查找，将查找的复杂度大大减少。对于一个长度为 O(n) 的数组，二分查找的时间复
// 杂度为 O(log n)。
// 举例来说，给定一个排好序的数组 {3,4,5,6,7}，我们希望查找 4 在不在这个数组内。第一次
// 折半时考虑中位数 5，因为 5 大于 4, 所以如果 4 存在于这个数组，那么其必定存在于 5 左边这一
// 半。于是我们的查找区间变成了 {3,4,5}。（注意，根据具体情况和您的刷题习惯，这里的 5 可以
// 保留也可以不保留，并不影响时间复杂度的级别。）第二次折半时考虑新的中位数 4，正好是我们
// 需要查找的数字。于是我们发现，对于一个长度为 5 的数组，我们只进行了 2 次查找。如果是遍
// 历数组，最坏的情况则需要查找 5 次。
// 我们也可以用更加数学的方式定义二分查找。给定一个在 [a, b] 区间内的单调函数 f (x)，若
// f (a) 和 f (b) 正负性相反，那么必定存在一个解 c，使得 f (c) = 0。在上个例子中，f (x) 是离散函数
// f (x) = x +2，查找 4 是否存在等价于求 f (x) −4 = 0 是否有离散解。因为 f (1) −4 = 3 4 = 1 < 0、 f (5) − 4 = 7 4 = 3 > 0，
// 且函数在区间内单调递增，因此我们可以利用二分查找求解。如果最后
// 二分到了不能再分的情况，如只剩一个数字，且剩余区间里不存在满足条件的解，则说明不存在
// 离散解，即 4 不在这个数组内。
// 具体到代码上，二分查找时区间的左右端取开区间还是闭区间在绝大多数时候都可以，因此
// 有些初学者会容易搞不清楚如何定义区间开闭性。这里我提供两个小诀窍，第一是尝试熟练使用
// 一种写法，比如左闭右开（满足 C++、Python 等语言的习惯）或左闭右闭（便于处理边界条件），
// 尽量只保持这一种写法；第二是在刷题时思考如果最后区间只剩下一个数或者两个数，自己的写
// 法是否会陷入死循环，如果某种写法无法跳出死循环，则考虑尝试另一种写法。
// 二分查找也可以看作双指针的一种特殊情况，但我们一般会将二者区分。双指针类型的题，
// 指针通常是一步一步移动的，而在二分查找里，指针每次移动半个区间长度。

// 4.2 求开方
// 69. Sqrt(x) (Easy)
// 题目描述
// 给定一个非负整数，求它的开方，向下取整。
// 4.3 查找区间 – 15/143 –
// 输入输出样例
// 输入一个整数，输出一个整数。
// Input: 8
// Output: 2
// 8 的开方结果是 2.82842...，向下取整即是 2。
/**
 *
 * @param {number} a
 */
function mySqrt(a) {
  const halfTarget = Math.floor(a / 2)
  let l, r
  if (halfTarget * halfTarget >= a) {
    l = 0
    r = halfTarget
  } else {
    l = halfTarget
    r = a
  }

  for (; l <= r; l++) {
    if (l * l < a && l + 1 <= r && (l + 1) * (l + 1) > a) {
      return l
    }
    if (l * l === a) {
      return l
    }
  }
}

console.log(mySqrt(8))

// 4.3 查找区间
// 34. Find First and Last Position of Element in Sorted Array (Medium)
// 4.3 查找区间 – 16/143 –
// 题目描述
// 给定一个增序的整数数组和一个值，查找该值第一次和最后一次出现的位置。
// 输入输出样例
// 输入是一个数组和一个值，输出为该值第一次出现的位置和最后一次出现的位置（从 0 开
// 始）；如果不存在该值，则两个返回值都设为-1。
// Input: nums = [5,7,7,8,8,10], target = 8
// Output: [3,4]
// 数字 8 在第 3 位第一次出现，在第 4 位最后一次出现。
// 复杂度为O(log n)

function searchRange(numbers, target) {
  let result = [-1, -1]
  if (!numbers.length) return result

  const first = lowerBound(numbers, target)
  const second = upperBound(numbers, target) - 1

  if (numbers[first] !== target || first === target.length - 1) return result
  result = [first, second]

  return result
}

function lowerBound(numbers, target) {
  let l = 0,
    r = numbers.length - 1,
    mid
  while (l < r) {
    mid = Math.floor((l + r) / 2)
    if (numbers[mid] >= target) {
      r = mid
    } else {
      l = mid + 1
    }
  }
  return l
}

function upperBound(numbers, target) {
  let l = 0,
    r = numbers.length - 1,
    mid
  while (l < r) {
    mid = Math.floor((l + r) / 2)
    if (numbers[mid] > target) {
      r = mid
    } else {
      l = mid + 1
    }
  }
  return numbers[l] === target ? l + 1 : l
}

console.log(searchRange([5, 7, 7, 8, 8, 10], 8))

// 4.4 旋转数组查找数字
// 81. Search in Rotated Sorted Array II (Medium)
// 题目描述
// 一个原本增序的数组被首尾相连后按某个位置断开（如 [1,2,2,3,4,5] → [2,3,4,5,1,2]，在第一
// 位和第二位断开），我们称其为旋转数组。给定一个值，判断这个值是否存在于这个为旋转数组
// 中。
// 输入输出样例
// 输入是一个数组和一个值，输出是一个布尔值，表示数组中是否存在该值。
// Input: nums = [2,5,6,0,0,1,2], target = 0
// Output: true

function search(numbers, target) {
  let start = 0,
    end = numbers.length - 1,
    mid

  while (start < end) {
    mid = Math.floor((start + end) / 2)
    if (numbers[mid] === target) {
      return true
    }

    if (numbers[start] === numbers[mid]) {
      start++
    } else if (numbers[mid] <= numbers[end]) {
      if (numbers[mid] < target && numbers[end] >= target) {
        start = mid + 1
      } else {
        end = mid - 1
      }
    } else {
      if (target >= numbers[start] && numbers[mid] > target) {
        end = mid - 1
      } else {
        start = mid + 1
      }
    }
  }
  return false
}

console.log(search([2,5,6,0,0,1,2], 0))