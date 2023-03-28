// 此方法不对
async function batchRequest(requests, numbers) {
  let reqCells = []
  let result = []
  let errors = []
  if (numbers >= requests.length) {
    reqCells = [requests]
  } else {
    for (let i = 0, len = 0; i < Math.ceil(requests.length / numbers); i++) {
      reqCells.push(requests.slice(len, numbers))
      len += numbers
    }
  }

  for (const req of reqCells) {
    try {
      const r = await new Promise.race(req)
      result.push(...r)
    } catch (error) {
      errors.push(error)
    }
  }
  return {
    result,
    errors,
  }
}

function mockRequest(message) {
  console.log(`发送${message}`)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(message)
    }, 1000)
  })
}

function makeReqTasks(mocker, count) {
  const result = []
  for (let i = 0; i < count; i++) {
    result.push(mocker)
  }

  return result
}

// TODO..
async function concurrentRequestsControl(tasks, limit) {
  const currentTasks = []
  const res = []

  for (let i = 0; i < tasks.length; i++) {
    const cur = tasks[i](i)
      .then((res) => {
        console.log(`${res}请求成功`)
        res[i] = res
        currentTasks.splice(i, 1)
      })
      .catch((err) => {
        res[i] = err
        currentTasks.splice(i, 1)
      })

    currentTasks.push(cur)
    if (currentTasks.length == limit) {
      await Promise.race(currentTasks)
    }
  }

  return Promise.allSettled(currentTasks)
}
const tasks = makeReqTasks(mockRequest, 10)
// batchRequest(tasks, 3)
concurrentRequestsControl(tasks, 1).then((res) => {
  //   console.log(`这是第${res}个请求`)
})
