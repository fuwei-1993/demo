// 6.1 算法解释
// 深度优先搜索和广度优先搜索是两种最常见的优先搜索方法，它们被广泛地运用在图和树等
// 结构中进行搜索。
// 6.2 深度优先搜索
// 深度优先搜索（depth-first seach，DFS）在搜索到一个新的节点时，立即对该新节点进行遍
// 历；因此遍历需要用先入后出的栈来实现，也可以通过与栈等价的递归来实现。对于树结构而言，
// 由于总是对新节点调用遍历，因此看起来是向着“深”的方向前进。
// 考虑如下一颗简单的树。我们从 1 号节点开始遍历，假如遍历顺序是从左子节点到右子节点，
// 那么按照优先向着“深”的方向前进的策略，假如我们使用递归实现，我们的遍历过程为 1（起
// 始节点）->2（遍历更深一层的左子节点）->4（遍历更深一层的左子节点）->2（无子节点，返回
// 父结点）->1（子节点均已完成遍历，返回父结点）->3（遍历更深一层的右子节点）->1（无子节
// 点，返回父结点）-> 结束程序（子节点均已完成遍历）。如果我们使用栈实现，我们的栈顶元素
// 的变化过程为 1->2->4->3。

// 深度优先搜索也可以用来检测环路：记录每个遍历过的节点的父节点，若一个节点被再次遍
// 历且父节点不同，则说明有环。我们也可以用之后会讲到的拓扑排序判断是否有环路，若最后存
// 在入度不为零的点，则说明有环。
// 有时我们可能会需要对已经搜索过的节点进行标记，以防止在遍历时重复搜索某个节点，这
// 种做法叫做状态记录或记忆化（memoization）。

// 695. Max Area of Island (Easy)
// 题目描述
// 给定一个二维的 0-1 矩阵，其中 0 表示海洋，1 表示陆地。单独的或相邻的陆地可以形成岛
// 屿，每个格子只与其上下左右四个格子相邻。求最大的岛屿面积。
// 6.2 深度优先搜索 – 25/143 –
// 输入输出样例
// 输入是一个二维数组，输出是一个整数，表示最大的岛屿面积。
// Input:
// [[1,0,1,1,0,1,0,1],
// [1,0,1,1,0,1,1,1],
// [0,0,0,0,0,0,0,1]]
// Output: 6
// 最大的岛屿面积为 6，位于最右侧。
/**
 *
 * @param {Array<number[]>} grid
 */
function maxAreaOfIsland(grid) {
  let area = 0,
    maxArea = 0

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 1) {
        area = getArea(grid, i, j)
        maxArea = Math.max(maxArea, area)
      }
    }
  }

  return maxArea
}

function getArea(grid, i, j) {
  if (i < 0) return 0
  if (j < 0) return 0
  if (i >= grid.length) return 0
  if (j >= grid[i].length) return 0
  if (grid[i][j] === 1) {
    grid[i][j] = 0
    return (
      1 +
      getArea(grid, i - 1, j) +
      getArea(grid, i + 1, j) +
      getArea(grid, i, j + 1) +
      getArea(grid, i, j - 1)
    )
  }

  return 0
}

console.log(
  maxAreaOfIsland([
    [1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1],
  ])
)

// 547. Friend Circles (Medium)
// 题目描述
// 给定一个二维的 0-1 矩阵，如果第 (i, j) 位置是 1，则表示第 i 个人和第 j 个人是朋友。已知
// 朋友关系是可以传递的，即如果 a 是 b 的朋友，b 是 c 的朋友，那么 a 和 c 也是朋友，换言之这
// 三个人处于同一个朋友圈之内。求一共有多少个朋友圈。
// 输入输出样例
// 输入是一个二维数组，输出是一个整数，表示朋友圈数量。因为朋友关系具有对称性，该二
// 维数组为对称矩阵。同时，因为自己是自己的朋友，对角线上的值全部为 1。
// Input:
// [[1,1,0],
// [1,1,0],
// [0,0,1]]
// Output: 2
// 在这个样例中，[1,2] 处于一个朋友圈，[3] 处于一个朋友圈。

/**
 *
 * @param {Array<number[]>} friends
 */
function findCircleNum(friends) {
  let len = friends.length,
    count = 0,
    visited = []

  for (let i = 0; i < len; i++) {
    if (!visited[i]) {
      dfs(friends, i, visited)
      count++
    }
  }
  return count
}

function dfs(friends, i, visited) {
  visited[i] = true
  for (let k = 0; k < friends[i].length; k++) {
    if (friends[i][k] === 1 && !visited[k]) {
      dfs(friends, k, visited)
    }
  }
}

console.log(
  findCircleNum([
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
  ])
)

// 417. Pacific Atlantic Water Flow (Medium)
// 题目描述
// 给定一个二维的非负整数矩阵，每个位置的值表示海拔高度。假设左边和上边是太平洋，右
// 边和下边是大西洋，求从哪些位置向下流水，可以流到太平洋和大西洋。水只能从海拔高的位置
// 流到海拔低或相同的位置。
// 输入输出样例
// 输入是一个二维的非负整数数组，表示海拔高度。输出是一个二维的数组，其中第二个维度
// 大小固定为 2，表示满足条件的位置坐标。
// Input:
// 太平洋 ~ ~ ~ ~ ~
// ~ 1 2 2 3 (5) *
// ~ 3 2 3 (4) (4) *
// ~ 2 4 (5) 3 1 *
// ~ (6) (7) 1 4 5 *
// ~ (5) 1 1 2 4 *
// * * * * * 大西洋
// Output: [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]
// 在这个样例中，有括号的区域为满足条件的位置。
// TODO...

// 6.3 回溯法
// 回溯法（backtracking）是优先搜索的一种特殊情况，又称为试探法，常用于需要记录节点状
// 态的深度优先搜索。通常来说，排列、组合、选择类问题使用回溯法比较方便。
// 顾名思义，回溯法的核心是回溯。在搜索到某一节点的时候，如果我们发现目前的节点（及
// 其子节点）并不是需求目标时，我们回退到原来的节点继续搜索，并且把在目前节点修改的状态 还原。这样的好处是我们可以始终只对图的总状态进行修改，而非每次遍历时新建一个图来储存
// 状态。在具体的写法上，它与普通的深度优先搜索一样，都有 [修改当前节点状态]→[递归子节
// 点] 的步骤，只是多了回溯的步骤，变成了 [修改当前节点状态]→[递归子节点]→[回改当前节点
// 状态]。
// 没有接触过回溯法的读者可能会不明白我在讲什么，这也完全正常，希望以下几道题可以让
// 您理解回溯法。如果还是不明白，可以记住两个小诀窍，一是按引用传状态，二是所有的状态修 改在递归完成后回改。
// 回溯法修改一般有两种情况，一种是修改最后一位输出，比如排列组合；一种是修改访问标
// 记，比如矩阵里搜字符串。

// 46. Permutations (Medium)
// 题目描述
// 给定一个无重复数字的整数数组，求其所有的排列方式。
// 输入输出样例
// 输入是一个一维整数数组，输出是一个二维数组，表示输入数组的所有排列方式。
// Input: [1,2,3]
// Output: [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
// 可以以任意顺序输出，只要包含了所有排列方式即可。

/**
 *
 * @param {number[]} numbers
 */
function permute(numbers) {
  const ans = [],
    temp = [],
    visited = []
  dfs(ans, numbers, temp, visited)
  return ans
}

function dfs(ans, numbers, temp, visited) {
  if (temp.length === numbers.length) {
    ans.push([...temp])
    return
  } else {
    for (let i = 0; i < numbers.length; i++) {
      if (visited[i]) continue
      visited[i] = true
      temp.push(numbers[i])
      dfs(ans, numbers, temp, visited)
      visited[i] = false
      temp.length -= 1
    }
  }
}

console.log(permute([1, 2, 3]))

// 77. Combinations (Medium)
// 题目描述
// 给定一个整数 n 和一个整数 k，求在 1 到 n 中选取 k 个数字的所有组合方法。
// 输入输出样例
// 输入是两个正整数 n 和 k，输出是一个二维数组，表示所有组合方式。
// Input: n = 4, k = 2
// Output: [[2,4], [3,4], [2,3], [1,2], [1,3], [1,4]]
// 这里二维数组的每个维度都可以以任意顺序输出。
/**
 *
 * @param {number} n
 * @param {number} k
 */
function combinations(n, k) {
  const result = []
  function dfs(n, k, visited, pos) {
    if (k === 0) {
      result.push([...visited])
      return
    }
    for (let i = pos; i <= n; i++) {
      visited.push(i)

      dfs(n, k - 1, visited, i + 1)
      visited.length -= 1
    }
  }

  dfs(n, k, [], 1)
  return result
}

combinations(8, 2)

// 79. Word Search (Medium)
// 题目描述
// 给定一个字母矩阵，所有的字母都与上下左右四个方向上的字母相连。给定一个字符串，求
// 字符串能不能在字母矩阵中寻找到。
// 输入输出样例
// 输入是一个二维字符数组和一个字符串，输出是一个布尔值，表示字符串是否可以被寻找
// 到。
// Input: word = "ABCCED", board =
// [[’A’,’B’,’C’,’E’],
// [’S’,’F’,’C’,’S’],
// [’A’,’D’,’E’,’E’]]
// Output: true
// 从左上角的’A’ 开始，我们可以先向右、再向下、最后向左，找到连续的"ABCCED"。

function wordSearch(word, board) {
  let find = false
  const visited = createVisited(board)

  function findMatchString(i, j, currentIdx, visited) {
    if (i < 0 || i > board.length - 1) return
    if (j < 0 || j > board[i].length - 1) return
    if (visited[i][j] || word[currentIdx] !== board[i][j] || find) return
    if (currentIdx === word.length - 1) return (find = true)

    visited[i][j] = true
    findMatchString(i - 1, j, currentIdx + 1, visited)
    findMatchString(i + 1, j, currentIdx + 1, visited)
    findMatchString(i, j - 1, currentIdx + 1, visited)
    findMatchString(i, j + 1, currentIdx + 1, visited)
    visited[i][j] = false
    return
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      findMatchString(i, j, 0, visited)
    }
  }

  return find
}

function createVisited(board) {
  const visited = []
  for (let i = 0; i < board.length; i++) {
    visited.push([])
  }
  return visited
}

wordSearch('ABCCED', [
  ['A', 'B', 'C', 'E'],
  ['S', 'F', 'C', 'S'],
  ['A', 'D', 'E', 'E'],
])

// 51. N-Queens (Hard)

// 题目描述
// 给定一个大小为 n 的正方形国际象棋棋盘，求有多少种方式可以放置 n 个皇后并使得她们互
// 不攻击，即每一行、列、左斜、右斜最多只有一个皇后。
// 图 6.1: 题目 51 - 八皇后的一种解法
// 输入输出样例
// 输入是一个整数 n，输出是一个二维字符串数组，表示所有的棋盘表示方法。
// Input: 4
// Output: [
// [".Q..", // Solution 1
// "...Q",
// "Q...",
// "..Q."],
// ["..Q.", // Solution 2
// "Q...",
// "...Q",
// ".Q.."]
// ]
// 在这个样例中，点代表空白位置，Q 代表皇后。
/**
 *
 * @param {number} n
 */
function solveNQueens(n) {
  const chess = createQueensChess(n)
  const result = []
  function resolve(chess, row) {
    if (chess.length === row) {
      result.push(chess)
      return 
    }

    for (let i = 0; i < n; i++) {
      if (validate(chess, row, i)) {
        const temp = copy(chess)
        temp[row][i] = 'Q'
        resolve(temp, row + 1)
      }
    }
  }

  function copy(target) {
    return target.map((item) => [...item])
  }

  function validate(chess, row, col) {

    for(let i = 0; i < row; i++) {
      if(chess[i][col] === 'Q') {
        return false
      }
    }

    for(let i = row - 1, j = col - 1; i >=0 && j >= 0;i--,j--) {
      if(chess[i][j] === 'Q') {
        return false
      }
    }
  
    for(let i = row - 1, j = col + 1; i > 0 && j < n ;i--,j++) {
      if(chess[i][j] === 'Q') {
        return false
      }
    }

    return true
  }

  resolve(chess, 0)

  return result
}

function createQueensChess(n) {
  const result = []
  for (let i = 0; i < n; i++) {
    result[i] = []
    for (let j = 0; j < n; j++) {
      result[i].push('.')
    }
  }

  return result
}


console.log(solveNQueens(4))

