import Bird from './bird.js'
import Map from './map.js'
import Land from './land.js'
import Pipes from './pipes.js'
import Sense from './sense.js'
import { BIRD_STATUS, SCENE_STATUS } from './constant.js'

export default class Platform {
  constructor(imgEls) {
    this.imgEls = imgEls
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.requestID = null
    this.map = null
    this.bird = null
    this.land = null
    this.pipes = null
    this.sense = null
    this.fps = 60
    this.now = 0
    this.interval = 1000 / this.fps
    this.delta
    this.then = Date.now()
    this.renderPlatform()
  }

  createRoles() {
    this.map = new Map({
      el: this.imgEls['bg'],
      canvas: this.canvas,
      speed: 2,
      width: screen.width,
      height: screen.height,
    })

    this.bird = new Bird({
      x: this.map.width / 2 - 50,
      y: 50,
      el: this.imgEls['bird'],
      canvas: this.canvas,
      speed: 3,
    })

    this.land = new Land({
      el: this.imgEls['land'],
      canvas: this.canvas,
      speed: 3,
      map: this.map,
      bird: this.bird,
      onCollision: this.onCollision,
    })

    this.pipes = new Pipes({
      x: this.map.width,
      speed: 3,
      pipeDownEl: this.imgEls['pipeDown'],
      pipeUpEl: this.imgEls['pipeUp'],
      spacing: 120,
      canvas: this.canvas,
      bird: this.bird,
      onCollision: this.onCollision,
      minHeight: this.map.height - this.land.height,
    })
  }

  initCanvas() {
    this.canvas.width = screen.width
    this.canvas.height = screen.height
    document.querySelector('#app').appendChild(this.canvas)
  }

  handleBirdUp = () => {
    this.bird.status = BIRD_STATUS.UP
  }

  bindBirdUp() {
    this.canvas.addEventListener('click', this.handleBirdUp)
  }

  onCollision = () => {
    this.stopBackground()
    this.removeBirdUp()
    this.sense.entry(SCENE_STATUS.END_GAME)
  }

  removeBirdUp() {
    this.canvas.removeEventListener('click', this.handleBirdUp)
  }

  draw() {
    const { width, height } = this.canvas
    this.ctx.clearRect(0, 0, width, height)
  }

  run() {
    this.requestID = window.requestAnimationFrame(this.run.bind(this))
    this.now = Date.now()
    this.delta = this.now - this.then

    if (this.delta > this.interval) {
      // 这里不能简单then=now，否则还会出现上边简单做法的细微时间差问题。例如fps=10，每帧100ms，而现在每16ms（60fps）执行一次draw。16*7=112>100，
      // 需要7次才实际绘制一次。这个情况下，实际10帧需要112*10=1120ms>1000ms才绘制完成。
      this.then = this.now - (this.delta % this.interval)
      this.draw()
      this.sense.run()
    }
  }

  stopBackground() {
    this.map.stop()
    this.land.stop()
    this.pipes.stop()
  }

  stop() {
    window.cancelAnimationFrame(this.requestID)
  }

  renderPlatform() {
    this.initCanvas()
    this.sense = new Sense(this)
    this.sense.entry(SCENE_STATUS.START_GAME)
    this.run()
  }
}
