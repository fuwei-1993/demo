import Struct from './struct.js'
import { SCENE_STATUS } from './constant.js'

export default class Sense {
  constructor(platform) {
    this.platform = platform
    this.canvas = platform.canvas
    this.currentSense = null
    this.speed = 1.5
    this.gameOver = new Struct({
      el: platform.imgEls['gameOver'],
      canvas: this.canvas,
      onClick: this.runGame
    }) 
    this.title = new Struct({
      el: platform.imgEls['title'],
      canvas: this.canvas
    })
    this.button = new Struct({
      el: platform.imgEls['play'],
      canvas: this.canvas,
      onClick: this.runGame
    })
    this.bird = new Struct({
      el: platform.imgEls['bird'],
      canvas: this.canvas,
    })
  }

  entry(sense) {
    if(sense === this.currentSense) return
    this.currentSense = sense
    switch (this.currentSense) {
      case SCENE_STATUS.START_GAME:
        this.initStartSense()
        break
      case SCENE_STATUS.RUN_GAME:
        this.initRunSense()
        break
      case SCENE_STATUS.END_GAME:
        this.initEndSense()
    }
  }


  run() {
    switch (this.currentSense) {
      case SCENE_STATUS.START_GAME:
        this.renderStartSense()
        break
      case SCENE_STATUS.RUN_GAME:
        this.renderRunSense()
        break
      case SCENE_STATUS.END_GAME:
        this.renderEndSense()
        break
    }
  }

  initStartSense() {
    this.platform.createRoles()
    this.title.alignCenter()
    this.title.y = 0
    this.bird.alignCenter()
    this.bird.y = this.canvas.height / 6 * 2
    this.button.alignCenter()
    this.button.y = this.canvas.height

  }

  initRunSense() {
    this.platform.createRoles()
    this.platform.bindBirdUp()
    this.button.unbindEvent()
    console.log(234)
  }

  initEndSense() {
    this.gameOver.alignCenter()
    this.gameOver.y = 0
  }

  renderStartSense() {
    this.platform.map.render()
    this.platform.land.render()
    this.title.render()
    this.verticalAnimation(this.title, this.canvas.height / 5, 3)
    this.button.render()
    this.verticalAnimation(this.button, this.canvas.height / 6 * 3, -8)
    this.bird.render()
    this.upDownAnimation(this.bird, this.canvas.height / 7 * 2, this.canvas.height / 5 * 2)

  }

  renderRunSense() {
    this.platform.map.run()
    this.platform.pipes.run()
    this.platform.bird.run()
    this.platform.land.run()
  }

  renderEndSense() {
    this.renderRunSense()
    this.gameOver.render()
    this.verticalAnimation(this.gameOver, this.canvas.height / 5,3)
  }

  upDownAnimation(target, min, max) {
    target.y += this.speed
    if (target.y >= max || target.y <= min) {
      this.speed = -this.speed
    }
  }

  verticalAnimation(target, height, speed) {
    const condition = speed > 0 ? target.y >= height : target.y <= height
    if (condition) {
      target.y = height
    } else {
      target.y += speed
    }
  }

  runGame = () => {
    this.entry(SCENE_STATUS.RUN_GAME)
  }
} 
