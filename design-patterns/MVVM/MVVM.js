class MVVM {
  constructor({ el, data }) {
    this.$el = el
    this.$data = data
    this.init()
  }

  init = () => {
    new Observer(this.$data, this)
    new Compile(this.$el, this)
    this.proxyData(this.$data)
  }

  proxyData = (data) => {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        get: () => {
          return data[key]
        },
        set: (newVal) => {
          data[key] = newVal
        },
      })
    })
  }
}
