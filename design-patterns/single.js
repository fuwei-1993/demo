// 5.2.6 命名空间 #
// 用户编写的代码与内部的类/函数/常量或第三方类/函数/常量之间的名字冲突。
// 为很长的标识符名称创建一个别名（或简短）的名称，提高源代码的可读性

const utils = {}

utils.def = (namespace, fn) => {
  const namespaceList = namespace.split('.')
  const fnName = namespaceList.pop()
  let current = utils

  namespaceList.forEach(element => {
      if(!current[element]) {
        current[element] = {}
      }
      current[element][fnName] = fn
  })

}

utils.def('dom.attr',function(key){
  console.log('dom.attr',key)
})

// utils.dom.attr('src')

console.log(utils)