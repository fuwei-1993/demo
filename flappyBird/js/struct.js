import { SCREEN_PERCENT } from './constant.js'

export default class AbstractStruct {
  constructor({ width, height, x = 0, y = 0, speed, el, canvas, onClick }) {
    this.imgPosition = 0
    this.width = width || el[this.imgPosition].width
    this.height = height || el[this.imgPosition].height
    this.x = x
    this.y = y
    this.speed = speed * SCREEN_PERCENT.WIDTH
    this.el = el
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.pause = false
    onClick && this.bindEvent(onClick)
  }

  update() {
    throw new Error('他们说这就是人生 "update"')
  }

  render() {
    this.ctx.drawImage(
      this.el[this.imgPosition],
      this.x, this.y, this.width, this.height)
  }

  run() {
    this.update()
    this.render()
  }

  stop() {
    this.speed = 0
  }

  bindEvent(onClick) {
    this.canvas.addEventListener('click', (e) => {
      if (
        this.x / this.canvas.width <= e.clientX
        && e.clientX <= this.x + this.width
        && this.y <= e.clientY
        && this.y + this.height >= e.clientY
      ) {
        onClick()
      }
    })
  }

  alignCenter() {
    this.x = this.canvas.width / 2 - this.width / 2
  }

}
