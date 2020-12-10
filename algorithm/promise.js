const STATUS = {
  pending: 'pending',
  rejected: 'rejected',
  fulfilled: 'fulfilled',
}

class MyPromise {
  status = STATUS.pending
  value = null
  reason = null
  promise2 = null
  onFulfilledCallbacks = []
  onRejectedCallbacks = []

  static all = (promises) => {
    const result = []
    return new MyPromise((resolve, reject) => {
      promises.forEach((p) => {
        p.then((val) => {
          result.push(val)
          if (result.length === promises.length) {
            resolve(result)
          }
        }, reject)
      })
    })
  }

  static race = (promises) => {
    return new MyPromise((resolve, reject) => {
      promises.forEach(p => {
        p.then(resolve, reject)
      })
    })  
  }

  static resolve = (value) => {
    return new MyPromise((r) => {
      r(value)
    })
  }

  static reject = (reason) => {
    return new MyPromise((_, reject) => {
      reject(reason)
    })
  }

  constructor(executor) {
    try {
      executor && executor(this.resolve, this.reject)
    } catch (error) {
      console.log(error)
      this.reject(error)
    }
  }

  resolve = (value) => {
    if (this.status === STATUS.pending) {
      this.value = value
      this.status = STATUS.fulfilled

      this.onFulfilledCallbacks.forEach((cb) => cb(value))
    }
  }

  reject = (reason) => {
    if (this.status === STATUS.pending) {
      this.reason = reason
      this.status = STATUS.rejected

      this.onRejectedCallbacks.forEach((cb) => cb(reason))
    }
  }

  resolvePromise(x, resolve, reject) {
    if (x === this.promise2) {
      throw new Error('xxx')
    }

    if (x instanceof MyPromise) {
      x.then(
        (value) => {
          this.resolvePromise(value, resolve, reject)
        },
        (reason) => {
          reject(reason)
        }
      )
    } else {
      resolve(x)
    }
  }

  resolvePromiseAsync(x, resolve, reject) {
    setTimeout(() => {
      try {
        this.resolvePromise(x(), resolve, reject)
      } catch (error) {
        reject(error)
      }
    })
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value

    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason
          }

    this.promise2 = new MyPromise((resolve, reject) => {
      const createParamsByStatus = {
        [STATUS.fulfilled]: () => onFulfilled(this.value),
        [STATUS.rejected]: () => onRejected(this.reason),
      }

      const params = (status = this.status) => [
        createParamsByStatus[status],
        resolve,
        reject,
      ]

      switch (this.status) {
        case STATUS.pending:
          this.onRejectedCallbacks.push(() => {
            this.resolvePromiseAsync(...params(STATUS.rejected))
          })
          this.onFulfilledCallbacks.push(() => {
            this.resolvePromiseAsync(...params(STATUS.fulfilled))
          })
          break
        default:
          this.resolvePromiseAsync(...params())
      }
    })

    return this.promise2
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }
}

const a = new MyPromise((r) => {
  setTimeout(() => {
    console.log(2)
    r(1)
  }, 1000)
}).then((val) => {
  console.log('start....')
  console.log('first then', val)
  return MyPromise.reject(111)
})

a.then((val) => {
  console.log('second then', val)
  return 1
}).then((val) => {
  console.log('third then', val)
})

MyPromise.race([new MyPromise((r) => r(1)), new MyPromise((r, reject) => reject(2))]).then(
  (v) => {
    console.log(v)
  }, (e) => {
    console.log(e)
  }
)
