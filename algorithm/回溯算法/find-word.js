// 给定一个二维数组网格board和一个字符串单词word
// 如果字符串存在于board中返回true否则返回false
// 单词必须按照顺序，通过相邻的单元格内的字母组成

// 二维数组 board = [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']]
// 目标 word = 'ABCCED'

function exist(board, word) {
  const row = board.length
  const col = board[0].length

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const word = findWord(i, j, 0)
      if (word) {
        return true
      }
    }
  }

  function findWord(i, j, start) {
    if (i < 0) return
    if (j < 0) return
    if (i >= row) return
    if (j >= col) return
    if (start >= word.length) return word
    const current = board[i][j]
    if (current === word[start]) {
      // top
      const top = findWord(i - 1, j, start + 1)
      if(top) {
        return top
      }
      // bottom
      const bottom = findWord(i + 1, j, start + 1)

      if(bottom) {
        return bottom
      }
      // left
      const left = findWord(i, j - 1, start + 1)

      if(left) {
        return left
      }
      // right
      const right = findWord(i, j + 1, start + 1)

      if(right) {
        return right
      }
    }
    return
  }

  return false
}

const hasWords = exist(
  [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ],
  'ABCCEDFBA'
)

console.log(hasWords)
