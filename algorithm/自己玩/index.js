// TODO...
function square(n) {
  const grid = createGrid(n)
  const result = []

  function dfs(grid, row, col, target) {
    if (row >= n || col >= n) return

    target.push({col, row})
    dfs(grid, row + 1, col, target)

    if (target.length === n) {
      result.push(target)

      target = []
    }
  }

  for (let i = 0; i < grid.length; i++) {
    dfs(grid, 0, i, [])
  }

  return result
}

function createGrid(n) {
  const outerGrid = new Array(n).fill(0)

  return outerGrid.map(() => new Array(n).fill(0))
}

console.log(square(3))
