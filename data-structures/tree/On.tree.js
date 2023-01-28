const treeData = [
  {
    id: '1',
    title: 1,
    detail: 1,
  },
  {
    id: '2',
    title: 2,
    detail: 2,
  },
  {
    id: '3',
    title: 3,
    detail: 3,
  },
  {
    id: '1-1',
    title: '1-1',
    detail: '1-1',
    parentId: '1',
  },
  {
    id: '2-1',
    title: '2-1',
    detail: '2-1',
    parentId: '2',
  },
  {
    id: '3-1',
    title: '3-1',
    detail: '3-1',
    parentId: '3',
  },
]

class Node {
  constructor({ id, title, detail }) {
    this.id = id
    this.title = title
    this.detail = detail
    this.children = []
  }
}

function covert(src = []) {
  const root = new Node({ id: '1', title: 0, detail: 0 })
  const treeMap = new Map([[root.id, root]])

  for (const node of [...src]) {
    treeMap.set(node.id, {
      ...node,
      children: treeMap.has(node.id) ? [...treeMap.get(node.id).children] : [],
    })

    if (treeMap.has(node.parentId)) {
      treeMap.get(node.parentId).children.push(treeMap.get(node.id))
    } else if (node.parentId) {
      treeMap.set(node.parentId, {
        children: [treeMap.get(node.id)],
      })
    }
  }

  return [...treeMap.values()].filter(({ parentId }) => !parentId)
}

console.log(covert(treeData))
