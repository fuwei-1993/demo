function throttle(fn, timeout) {
  let timer = null
  let immediately = false
  return () => {
    if(!immediately) {
      fn?.()
      immediately = true
      return
    }

    if(!timer) {
      timer = setTimeout(() => {
        fn?.()
        timer = null
        immediately = false
      }, timeout)
    }
  }
}

const onClick = throttle(() => {
  console.log('yahaha');
}, 500)

document.getElementById('button').addEventListener('click', onClick)