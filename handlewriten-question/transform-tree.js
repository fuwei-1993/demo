// On 的线形复杂度
const arr = [
  { id: 1, name: 'A', pid: 0 },
  { id: 2, name: 'B', pid: 1 },
  { id: 3, name: 'C', pid: 1 },
  { id: 4, name: 'D', pid: 3 },
  { id: 5, name: 'E', pid: 4 },
]

// 方式1
// TODO..困了
function transformTree(arr) {
  const treeMap = {}
  const result = []

  arr.forEach((item) => {
    const { id, pid } = item
    if (!treeMap[id]) {
      treeMap[id] = {
        ...item,
        children: [],
      }
    }
    if (treeMap[pid]) {
      treeMap[pid].children.push(treeMap[id])
    }
    if (!pid) {
      result.push(treeMap[id])
    }
  })

  return result
}

console.log(transformTree(arr))
