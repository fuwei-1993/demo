let arr = [1, 2, 3, 4]

arr._map = function (fn, thisArg) {
  const result = []
  const a = this.reduce((prev, cur, curIndex, array) => {
    result.push(fn.call(thisArg, cur, curIndex, array))
    return prev
  })
  return result
}

const mockMapResult = arr._map((item, index) => {
  // console.log(item, index)
  return item
})

console.log(mockMapResult)

arr = [1, 23, 4, 5]

arr._reduce = function (fn, initValue) {
  let resultVal = initValue || this[0]
  const startIdx = initValue ? 0 : 1

  this.map((item, index) => {
    if (index >= startIdx) {
      resultVal = fn(resultVal, item, index)
    }
  })

  return resultVal
}

const mockReduceResult = arr._reduce((prev, cur) => {
  console.log(prev, cur)
  return prev.concat(cur)
}, [])

console.log(mockReduceResult)

let reducer = 234

const middlewareAPI = {
  reducer: () => reducer,
}

function compose({ reducer }) {
  return (next) => {}
}
console.log(middlewareAPI.reducer())
reducer = compose(middlewareAPI)
console.log(middlewareAPI.reducer())
reducer()
let test = 1
const obj = { test: () => test }

test = 2
console.log('-------',obj.test())