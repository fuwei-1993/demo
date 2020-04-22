const STATUS = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
}

class MyPromise {
  constructor(executor) {
    this.status = STATUS.PENDING
    this.value = ''
    this.reason = ''
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
    this.promise2 = null

    const resolve = (value) => {
      if ((this.status = STATUS.PENDING)) {
        this.status = STATUS.FULFILLED
        this.value = value
        this.onFulfilledCallbacks.forEach((cb) => cb())
      }
    }

    const reject = (reason) => {
      if ((this.status = STATUS.PENDING)) {
        this.status = STATUS.REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach((cb) => cb())
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  static resolve(value) {
    return new MyPromise((resolve) => {
      resolve(value)
    })
  }

  static reject(reason) {
    return new MyPromise((_, reject) => {
      reject(reason)
    })
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((p) => {
        p.then(resolve, reject)
      })
    })
  }

  static all(promises) {
    const result = []
    return new MyPromise((resolve, reject) => {
      promises.forEach((p) => {
        p.then((res) => {
          result.push(res)
          if (result.length === promises.length) {
            resolve(result)
          }
        }, reject)
      })
    })
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (error) => {
            throw error
          }
    this.promise2 = new Promise((resolve, reject) => {
      const curryResolvePromise = this.resolvePromiseAsync(resolve, reject)
      const callbacks = this.callbackFactory({
        onFulfilled,
        onRejected,
      })

      this.resolveThenDiffStatus(curryResolvePromise, callbacks)
    })
    return this.promise2
  }

  callbackFactory({ onFulfilled, onRejected }) {
    return {
      [STATUS.FULFILLED]: [() => onFulfilled(this.value)],
      [STATUS.REJECTED]: [() => onRejected(this.reason)],
      [STATUS.PENDING]: [
        () => onFulfilled(this.value),
        () => onRejected(this.reason),
      ],
    }
  }

  resolveThenDiffStatus(curryResolvePromise, callbacks) {
    const currentCallback = callbacks[this.status]
    switch (this.status) {
      case STATUS.FULFILLED:
      case STATUS.REJECTED:
        const [callback] = currentCallback
        curryResolvePromise(callback)
        break
      case STATUS.PENDING:
        const [onFulfilled, onRejected] = currentCallback
        this.onFulfilledCallbacks.push(() => curryResolvePromise(onFulfilled))
        this.onRejectedCallbacks.push(() => curryResolvePromise(onRejected))
        break
    }
  }

  resolvePromise(x, resolve, reject) {
    if (this.promise2 === x) {
      throw new TypeError('Chaining cycle detected for promise #<Promise>')
    }
    if (x instanceof MyPromise) {
      try {
        x.then(
          (y) => {
            this.resolvePromiseAsync(resolve, reject)(() => y)
          },
          (error) => {
            reject(error)
          }
        )
      } catch (error) {
        reject(error)
      }
    } else {
      resolve(x)
    }
  }

  resolvePromiseAsync(resolve, reject) {
    return (x) => {
      setTimeout(() => {
        try {
          this.resolvePromise(x(), resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    }
  }

  catch(cb) {
    this.then(null, cb)
  }
}

const a = new MyPromise((r) => {
  setTimeout(() => {
    r(2)
  }, 1000)
})
  .then(
    (res) => {
      return { then: 234 }
    },
    (err) => {
      console.log(err)
    }
  )
  .then((res) => {
    console.log(res)
  })
