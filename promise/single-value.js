// promise只有一个值的返回 这造成了局限性 ，有的时候你需要多个的时候

function getY (x) {
  return new Promise(function(r) {
    r(x * 3 - 1)
  })
}

function foo(bar, baz) {
  const x = bar * baz
  return getY(x).then(y => [x, y])
}

foo(10, 20).then(msg => {
  const [x, y] = msg
  console.log(x, y);
})

// 但是上面的写法过于臃肿，可以尝试将每次值都使用promise来解决
// 此方式并非更好的写法但是更符合promise的理念和更有利于扩展

function foo2(bar, baz) {
  const x = bar * baz
  
  return [Promise.resolve(x), getY(x)]
}

Promise.all(foo2(10, 20)).then(msg => {
  const [x, y] = msg
  console.log(x, y);
})

// 有人说赋值 x y 的值太过于麻烦 （谁说的？）

function spread(fn) {
  // 这尼玛有点 trick
  return Function.apply.bind(fn, null) // 拆分理解一下就是 bind把null 传递给apply的this指向， 剩下的参数接受执行它的的参数，这里刚好是数组
}

Promise.all(foo2(10, 20)).then(spread(function(x, y) {
  console.log(x, y);
}))

// 不过解构是最好的方案

Promise.all(foo2(10, 20)).then(function ([x, y]) {
  console.log(x, y);
})