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
    this.onClick = onClick
    onClick && this.bindEvent()
  }

  update() {
    throw new Error('他们说这就是人生 "update"')
  }

  render() {
    this.ctx.drawImage(
      this.el[this.imgPosition],
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  run() {
    this.update()
    this.render()
  }

  stop() {
    this.speed = 0
  }

  handleEvent = (e, cb) => {
    if (
      this.x <= e.clientX &&
      e.clientX <= this.x + this.width &&
      this.y <= e.clientY &&
      this.y + this.height >= e.clientY
    ) {
      this.onClick()
    }
  }

  bindEvent() {
    this.canvas.addEventListener('click', this.handleEvent)
  }

  unbindEvent() {
    this.canvas.removeEventListener('click', this.handleEvent)
  }

  alignCenter() {
    this.x = this.canvas.width / 2 - this.width / 2
  }
}
