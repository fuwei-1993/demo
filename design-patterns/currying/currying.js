const add = (...arg) => arg.reduce((a, b) => a + b)

function currying(func) {
  const args = []
  return function result(...rest) {
    if (rest.length === 0) return func(...args)
    args.push(...rest)
    return result
  }
}

const sum = currying(add)

// console.log(sum(2)(4))
// console.log(sum(3))
// console.log(sum())

// function currying2(fn, length) {
//   const len = length || fn.length
//   return function (...args) {
//     return args.length >= len
//       ? fn.apply(this, args)
//       : currying2(fn.bind(this, ...args), len - args.length)
//   }
// }

const currying2 = (fn) => {
  const judge = (...args) =>
    args.length >= fn.length ? fn(...args) : (...arg) => judge(...args, ...arg)
  return judge
}

const fn = currying2((a, b, c) => {
  console.log([a, b, c].reduce((a, b) => a + b))
})

fn(1)(2)(3)
fn(1, 2)(3)
fn(1)(2, 3)
fn(1, 2, 3)

function throttling(fn, wait) {
  let beginTime = +new Date()
  return (...args) => {
    const endTime = +new Date()
    if (endTime - beginTime >= wait) {
      fn.apply(this, args)
      beginTime = endTime
    }
  }
}
// document.body.style.height = '3000px'
// window.onscroll = throttling((e) => {
// console.log(e)
// }, 800)
function testBind() {
  console.log(arguments)
  console.log(this)
}

Function.prototype.__bind = function (ctx) {
  const arg = [...arguments].slice(1)

  const ctxObj = new Object(ctx)
  ctxObj.fn = this
  return (...args) => {
    ctxObj.fn(...arg, ...args)
    delete ctxObj.fn
  }
}

testBind.__bind({ l: 24 }, 13123).__bind(234, 23234)(324)
const iterable = [1]
var iterator = iterable[Symbol.iterator]()
console.log(iterator.next())
console.log(iterator.next())
