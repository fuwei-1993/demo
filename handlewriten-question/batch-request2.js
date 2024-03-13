// 实现一个方法它能控制请求的并发量，（滑动窗口）

function mockRequest(message) {
  console.log(`发送${message}`)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (10 * Math.random() > 5) {
        resolve(message)
      } else {
        reject(`error: ${message}`)
      }
    }, 1000 * Math.random())
  })
}

function makeReqTasks(mocker, count) {
  const result = []
  for (let i = 0; i < count; i++) {
    result.push(mocker)
  }

  return result
}

async function handleConcurrentReq(requests, limit) {
  const responses = []
  const reqMap = new Map()

  for (let i = 0; i < requests.length; i++) {
    const req = requests[i](i)
      .then((res) => {
        if (reqMap.has(req)) {
          reqMap.delete(req)
        }
        responses[i] = res
      })
      .catch((err) => {
        if (reqMap.has(req)) {
          reqMap.delete(req)
        }
        responses[i] = err
      })

    reqMap.set(req, 0)

    if (limit === reqMap.size) {
      await Promise.race([...reqMap.keys()])
    }
  }
  return Promise.allSettled([...reqMap.keys()]).then(() => responses)
}

const tasks = makeReqTasks(mockRequest, 20)

handleConcurrentReq(tasks, 3).then((res) => {
  console.log(res)
})
