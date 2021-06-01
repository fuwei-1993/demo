// ### 401. 二进制手表
// 二进制手表顶部有 4 个 LED 代表 小时（0-11），底部的 6 个 LED 代表 分钟（0-59）。每个 LED 代表一个 0 或 1，最低位在右侧。

// 例如，下面的二进制手表读取 "3:25" 。

// ![Alt](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/03/29/binary_clock_samui_moon.jpg)

// 给你一个整数 turnedOn ，表示当前亮着的 LED 的数量，返回二进制手表可以表示的所有可能时间。你可以 按任意顺序 返回答案。

// 小时不会以零开头：

// 例如，"01:00" 是无效的时间，正确的写法应该是 "1:00" 。
// 分钟必须由两位数组成，可能会以零开头：

// 例如，"10:2" 是无效的时间，正确的写法应该是 "10:02" 。
//

// 示例 1：

// 输入：turnedOn = 1
// 输出：["0:01","0:02","0:04","0:08","0:16","0:32","1:00","2:00","4:00","8:00"]
// 示例 2：

// 输入：turnedOn = 9
// 输出：[]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/binary-watch
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

function readBinaryWatch(turnedOn) {
  const hours = createBasicTime([1, 2, 4, 8], 'hour')
  const mins = createBasicTime([1, 2, 4, 8, 16, 32], 'min')

  const times = mins.concat(hours)
  const result = []

  function dfs(temp, n, visited) {
    if (temp.length === turnedOn) {
      const sub = temp.reduce((result, curr) => ({
        min: result.min + curr.min,
        hour: result.hour + curr.hour,
      }))
      result.push(sub)
      return
    }

    for (let i = n; i < times.length; i++) {
      dfs(temp.concat(times[i]), i + 1, visited)
    }
  }

  dfs([], 0, visited)

  return result.filter(time => time.min <= 59 && time.hour <= 11).map(time => formatTime(time))
}

function createBasicTime(values, unit) {
  return values.map((value) => ({ min: 0, hour: 0, [unit]: value }))
}

function formatTime({min, hour}) {
  const formatMin = `${min}`.length > 1 ? `${min}`: `0${min}`
  return `${hour}:${formatMin}`
}

console.log(readBinaryWatch(6));
