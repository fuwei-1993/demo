
// 方式一：内层递归
// function curry(fn) {
//   const innerFn = (...arg) => {
//     if (arg.length < fn.length) return (...args) => innerFn(...arg, ...args)
//     return fn(...arg)
//   }
//   return innerFn
// }

// 方式二： 外层递归
function curry(fn) {
  return (...args) => {
    return args.length >= fn.length
      ? fn(...args)
      : (...args2) => {
          return curry(fn)(...args, ...args2)
        }
  }
}

const add = curry((a, b, c) => {
  return a + b + c
})

console.log(add(1)(2, 3))
console.log(add(1, 2, 3))
console.log(add(1)(2)(3))
console.log(add(1, 2)(3))
