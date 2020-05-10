const stack = new Array(6).fill(0)

const stackPromise =  stack.map((_, index) => () => new Promise(r => {
  setTimeout(() => {
    console.log(index)
    r()
  }, 1000* Math.random())
}))

async function asyncTest () {
  for (const iterator of stackPromise) {
    await iterator()
  }
}


// asyncTest()

