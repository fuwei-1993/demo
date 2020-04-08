import Map from './map.js'

export default class Land extends Map {
  constructor(arg) {
    super(arg)
    const { map, onCollision, bird } = arg
    this.y = map.height - this.height
    this.width = map.width
    this.onCollision = onCollision
    this.bird = bird

  }
  
  collision() {

    if (this.bird.y + this.bird.height / 2 >= this.y) {
      this.onCollision()
      this.bird.stop()

    }
  }
}