// generator

function add(a, b) {
  return a + b
}

function* gen(x) {
  console.log(x, '这个值是第一次next的参数')
  let y = yield add(x, 100) + 3
  console.log(y, '这个值是第二次next的参数')
  return 200
}

const g = gen(1)

console.log('g.next(): ', g.next()) // { value: 104, done: false }
console.log('g.next(): ', g.next()) // { value: 200, done: true }

// automatic generator

function run(gFunc, ...args) {
  const gen = gFunc(...args)

  function next(data) {
    const result = gen.next(data)
    if (result.done) {
      console.log(result)
      return
    }
    next(result.value)
  }
  next()
}

run(gen, 1)
