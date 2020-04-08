import AbstractStruct from './struct.js'
import { BIRD_STATUS, SCREEN_PERCENT } from './constant.js'

export default class Bird extends AbstractStruct {
  painting = 16 // 16fps
  duringWing = 100 // 100ms per time
  WingSpeed = 0 //
  downSpeed = this.speed * -2
  gravitational = this.speed * 0.1
  status = BIRD_STATUS.DOWN

  render() {
    this.ctx.save()
    this.ctx.translate(this.x, this.y)
    this.gravitational && this.ctx.rotate(this.speed * Math.PI / 30 / SCREEN_PERCENT.HEIGHT);
    this.ctx.drawImage(
      this.el[this.imgPosition],
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    )
    this.ctx.restore()
  }

  resetWingSpeed() {
    this.imgPosition = 0
    this.WingSpeed = 0
    this.duringWing = 100
  }

  updateWingSpeed() {
    this.WingSpeed += this.painting

    if (this.WingSpeed >= this.duringWing && this.speed <= 0) {
      this.imgPosition++
      this.duringWing += this.duringWing
    }

    if (this.imgPosition > this.el.length - 1) {
      this.resetWingSpeed()
    }
  }

  updateVerticalDistance() {
    this.speed = this.speed ? this.speed + this.gravitational : this.speed
    this.y = this.y + this.speed
  }

  updateBirdStatus() {
    switch (this.status) {
      case BIRD_STATUS.UP:
        this.speed = this.downSpeed
        this.status = BIRD_STATUS.DOWN
        break
      case BIRD_STATUS.DOWN:
        break
    }
  }

  update() {
    this.updateWingSpeed()
    this.updateBirdStatus()
    this.updateVerticalDistance()

  }
}
