let middleware = []
middleware.push((next) => {
    console.log(1)
    next()
    console.log(1.1)
})
middleware.push((next) => {
    console.log(2)
    next()
    console.log(2.1)
})
middleware.push((next) => {
    console.log(3)
    next()
    console.log(3.1)
})



let fn = compose(middleware)

fn()


// 定义
// reduce right 最好理解
/**
 * f3 = () => m3(() => {})
 * f2 = () => m2(f3)
 * f1 = () => m1(f2)
 * f1()
 */
function compose(mids) {
  return mids.reduceRight((result, cur) => {
    return () => cur(result)
  }, () => {})
}


// reduce 不太好理解
/**
 * f1 = (m) => m1(() => m2(m))
 * f2 = (m) => f1(() => m3(m))
 * r = (m) => f2(m) // m = () => {}
 */
function compose(mids) {
  return mids.reduce((result, cur) => {
    return (curr = () => {}) => result(() => cur(curr))
  })
}

