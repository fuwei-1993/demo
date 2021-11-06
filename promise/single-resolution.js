// promise 的单决策性 使得状态被更改一次之后就无法再次更改
const button = {
  addEventListener() {}
}

const p = new Promise((r) => {
  button.addEventListener('click', r)
})

p.then(() => {
  return new Promise((r) => {
    setTimeout(() => {
      r(1)
    }, 1000)
  })
}).then(res => {
  console.log(res);
})