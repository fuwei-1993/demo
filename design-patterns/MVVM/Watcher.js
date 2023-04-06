class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm
    this.expr = expr
    this.cb = cb
    this.value = this.get(vm, expr)
  }

  get = (vm, expr) => {
    Dep.sub = this
    const value = this.getVal(vm, expr)
    Dep.sub = null
    return value
  }

  getVal = (vm, expr) => {
    // return expr.split('.').reduce((result, key) => result[key], vm.$data)
    return eval(`vm.$data.${expr}`)
  }

  update = () => {
    const nextVal = this.getVal(this.vm, this.expr)
    const currVal = this.value

    if (currVal !== nextVal) {
      this.cb(nextVal, currVal)
      this.value = nextVal
    }
  }
}