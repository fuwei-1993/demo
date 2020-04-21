const PROMISE_STATUS = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
}

class MyPromise {
  promiseStatus = PROMISE_STATUS.PENDING
  promiseValue = undefined
  promiseReason = undefined
  onFulfilledCallBacks = []
  onRejectedCallBacks = []

  constructor(executor) {
    try {
      executor(this.__resolve.bind(this), this.__reject.bind(this))
    } catch (error) {
      this.__reject(error)
    }
  }
  static reject = function (reason) {
    const promise = new MyPromise()
    promise.promiseStatus = PROMISE_STATUS.REJECTED
    promise.promiseReason = reason
    return promise
  }

  static resolve = function (value) {
    const promise = new MyPromise()
    promise.promiseStatus = PROMISE_STATUS.FULFILLED
    promise.promiseValue = value
    return promise
  }

  __resolve(value) {
    if (this.promiseStatus === PROMISE_STATUS.PENDING) {
      this.promiseStatus = PROMISE_STATUS.FULFILLED
      this.promiseValue = value
      this.executeCallbacks(this.onFulfilledCallBacks, value)
    }
  }

  __reject(reason) {
    if (this.promiseStatus === PROMISE_STATUS.PENDING) {
      this.promiseStatus = PROMISE_STATUS.REJECTED
      this.promiseReason = reason
      this.executeCallbacks(this.onRejectedCallBacks, reason)
    }
  }

  executeCallbacks(callbacks, value) {
    const [firstCallback] = callbacks
    firstCallback &&
      callbacks.slice(1).reduce(
        (result, cb) => {
          return () => cb(result())
        },
        () => firstCallback(value)
      )()
  }

  then(onFulfilled, onRejected) {
    if (this.promiseStatus === PROMISE_STATUS.PENDING) {
      onFulfilled && this.onFulfilledCallBacks.push(onFulfilled)
      onRejected && this.onRejectedCallBacks.push(onRejected)
      return this
    } else if (this.promiseStatus === PROMISE_STATUS.FULFILLED) {
      const value = onFulfilled && onFulfilled(this.promiseValue)
      return MyPromise.resolve(value)
    } else {
      const reason = onRejected && onRejected(this.promiseReason)
      return MyPromise.resolve(reason)
    }
  }

  catch() {}

  final() {}
}

new MyPromise((resolve) => {
  // setTimeout(() => {
  resolve(1)
  // }, 1000)
})
  .then((res) => {
    console.log(res)
    return 2
  })
  .then((res) => {
    console.log(res)
    return 43
  })
  .then((res) => {
    console.log(res)
  })
  .then((res) => {
    console.log(res)
  })
