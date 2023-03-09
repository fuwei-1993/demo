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
function compose(mids) {
  return mids.reduceRight((result, cur) => {
    return () => cur(result)
  }, () => {})
}
