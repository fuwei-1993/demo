import AbstractStruct from './struct.js'
import { PIPE_STATUS } from './constant.js'

export default class Pipe extends AbstractStruct {
  constructor(arg) {
    super(arg)

    const { virtualHeight, status, spacing } = arg
    this.virtualHeight = virtualHeight
    this.spacing = spacing
    this.status = status
    this.initPip()
  }

  initPip() {
    switch (this.status) {
      case PIPE_STATUS.UP:
        this.imgPosition = 1
        this.y = this.virtualHeight + this.spacing
        break
      case PIPE_STATUS.DOWN:
        this.y = -(this.height - this.virtualHeight)
        break
    }
  }

  update() {
    this.x -= this.speed
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
}
