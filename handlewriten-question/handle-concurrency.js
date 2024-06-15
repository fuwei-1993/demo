/**
 * 控制并发函数
 * @param {(() => Promise)[]} requests
 * @param {number} quantity
 */
async function handleConcurrency(requests, quantity) {
  const concurrentPool = new Set()
  const result = []

  for (let i = 0; i < requests.length; i++) {
    const promise = requests[i]()
      .then((res) => {
        concurrentPool.delete(promise)
        return res
      })
      .catch((err) => {
        concurrentPool.delete(promise)
        return Promise.reject(err)
      })

    concurrentPool.add(promise)
    result.push(promise)

    if (concurrentPool.size === quantity) {
      try {
        await Promise.race(concurrentPool)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return Promise.allSettled(result)
}

const mockRequest = async (i) => {
    return new Promise((r, e) => {
      setTimeout(() => {
        if (i % 2 === 0) {
          r(i + '成功')
        } else {
          e(i + '失败')
        }
      }, Math.random() * 2000)
    })

}

const createRequests = (n) => {
  const result = []
  for (let i = 0; i < n; i++) {
    result.push(() => mockRequest(i))
  }
  return result
}

 handleConcurrency(createRequests(20), 1).then(res => {
  console.log(res)
 })
