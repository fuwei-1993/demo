import AbstractStruct from './struct.js'

export default class Map extends AbstractStruct {
  render() {
    this.draw(this.x)
    this.draw(this.x + this.width)
    this.draw(this.x + this.width * 2)
  }

  update() {
    this.x -= this.speed
    if (Math.abs(this.x) >= this.width) {
      this.x = 0
    }
    this.collision()
  }

  collision() {}

  draw(x) {
    this.ctx.drawImage(
      this.el[this.imgPosition],
      x,
      this.y,
      this.width,
      this.height
    )
  }
}
