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


// 例子：
function delayer (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

async function startDelay() {
  console.log(1)
  await delayer(1000)
  console.log(2)
  await delayer(2000)
  console.log(3)
}

startDelay()


// 模拟实现
function run2(genFunc, ...args) {
  const gen = genFunc(...args)

  function next(data) {
    const result = gen.next(data)
    if(result.done) {
      return
    }

    if(result.value.then) {
      result.value.then((res) => {
        next(res)
      })
    } else {
      next(result.value)
    }
  }

  next()
}

 function* startDelay2() {
  console.log(1, 'yield')
  yield delayer(1000)
  console.log(2, 'yield')
  yield delayer(2000)
  console.log(3, 'yield')
}

run2(startDelay2)