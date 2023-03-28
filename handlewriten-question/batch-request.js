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

// 正确的方法
async function concurrentRequestsControl(tasks, limit) {
  const responses = []
  const tasksMap = new Map()

  for (let i = 0; i < tasks.length; i++) {
    const cur = tasks[i](i)
      .then((res) => {
        console.log(`${res}请求成功`)
        responses[i] = res
        tasksMap.delete(cur)
        return res
      })
      .catch((err) => {
        responses[i] = err
        tasksMap.delete(cur)
      })

    tasksMap.set(cur, 0)

    if (tasksMap.size === limit) {
      await Promise.race([...tasksMap.keys()])
    }
  }

  return Promise.allSettled([...tasksMap.keys()]).then(() => responses)
}
const tasks = makeReqTasks(mockRequest, 20)

concurrentRequestsControl(tasks, 10).then((res) => {
  console.log(res)
})
