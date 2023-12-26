// 我们要实现这样的逻辑, 就意味着main必须是异步的，才能获取异步函数fetch中的结果
// async function main() {
//   try {
//     const result = await fetch('/api/data')
//     handleResult(result)
//   } catch (error) {
//     handleError(error)
//   }
// }

enum Status {
  SUCCESS = 'fulfilled',
  ERROR = 'rejected' ,
  PENDING = 'pending'
}

interface mockData {
  status: Status
  value: any
}

const CachePool: mockData = {
  status: Status.PENDING,
  value: ''
}


const handleResult = (value: number) => {
  console.log('success', value);
}
const handleError = (err: unknown) => {
  console.log('error', err);
}
const execute = () => {
  console.log('fetch执行了');
  const value = mockFetch()
  console.log('result执行了');
  handleResult(value)
}
function main() {
  try {
    execute()
  } catch (error) {
    if(error instanceof Promise) {
      error.then(execute, execute)
      .catch(handleError)
    } else {
      handleError(error)
    }
  }
}

function mockFetch() {
  if(CachePool.status === Status.SUCCESS) {
    return CachePool.value
  }
  if(CachePool.status === Status.ERROR) {
    throw CachePool.value
  }
  const fiftyPercent = Math.ceil(Math.random() * 10) % 2 === 0
// 代数效应
  throw new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fiftyPercent) {
        CachePool.status = Status.SUCCESS
        CachePool.value = 1
        resolve(1)
      } else {
        CachePool.status = Status.ERROR
        CachePool.value = 0
        reject(0)
      }
    }, 500)
  })
}

main()
// error 时打印：
// fetch执行了
// fetch执行了
// error 0

// success 时打印：
// fetch执行了
// fetch执行了
// result执行了
// success 1

// 这非常的react