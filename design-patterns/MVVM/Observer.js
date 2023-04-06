class Observer {
  constructor(data, vm) {
    this.vm = vm
    this.observe(data)
  }

  observe = (data) => {
    if (typeof data == 'object') {
      Object.keys(data).forEach((key) => {
        this.defineReactive(data, key, data[key])
        this.observe(data[key])
      })
    }
  }

  defineReactive = (obj, key, value) => {
    const dep = new Dep()

    Object.defineProperty(obj, key, {
      get: () => {
        Dep.sub && dep.addSub(Dep.sub)

        return value
      },
      set: (newVal) => {
        if (newVal !== value) {
          this.observe(newVal)
          value = newVal
          dep.notify()
        }
      },
    })
  }
}

class Dep {
  constructor() {
    this.subs = []
  }

  static sub = null

  addSub = (watcher) => {
    this.subs.push(watcher)
  }

  notify = () => {
    this.subs.forEach((watcher) => watcher.update())
  }
}
