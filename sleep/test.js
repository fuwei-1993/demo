const stack = new Array(6).fill(0)

const stackPromise = stack.map((_, index) => () =>
  new Promise((r) => {
    setTimeout(() => {
      console.log(index)
      r()
    }, 1000 * Math.random())
  })
)

async function asyncTest() {
  for (const iterator of stackPromise) {
    await iterator()
  }
}

function query(arr, target) {
  let first
  let second
  const result = []
  while (arr.length > 1) {
    first = arr.shift()
    second = arr.find((item) => item + first === target)
    if (typeof second === 'number') {
      result.push([first, second])
    }
  }
  return result
}

function query2(arr, target) {
  const arrMap = {}
  const result = []
  arr.forEach((item, index) => {
    arrMap[item] = index
  })

  arr.forEach((item, index) => {
    const secondIndex = arrMap[target - item]
    if (typeof secondIndex === 'number' && secondIndex !== index) {
      result.push([item, target - item])
    }
  })

  return result
}


console.time('query')
console.log(query(new Array(1000).fill(parseInt(Math.random() * 10))))
console.timeEnd('query')
console.time('query2')
console.log(query2(new Array(1000).fill(parseInt(Math.random() * 10))))
console.timeEnd('query2')

// asyncTest()
