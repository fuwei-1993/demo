import Pipe from './pipe.js'
import { PIPE_STATUS } from './constant.js'
import { SCREEN_PERCENT } from './constant.js'

export default class Pipes {
  constructor({
    pipeDownEl, 
    pipeUpEl, 
    canvas, 
    speed, 
    x, 
    spacing, 
    bird, 
    onCollision,
    minHeight 
  }) {
    this.spacing = spacing * SCREEN_PERCENT.HEIGHT
    this.commonProps = {
      canvas,
      speed,
      x,
      spacing: this.spacing
    }
    this.onCollision = onCollision
    this.pipeDownEl = pipeDownEl
    this.pipeUpEl = pipeUpEl
    this.pipes = {}
    this.pipesStack = []
    this.time = 0
    this.bird = bird
    this.pause = false
    this.height = pipeUpEl[0].height
    this.minHeight = minHeight - this.spacing - this.height
  }

  runPipes() {
    this.time += 1
    if (this.time % 80 === 0) {
      !this.pause && this.updatePipesStack()
    }
    this.pipes = this.pipesStack.filter(pipe => {
      pipe.run()
      !this.pause && this.collision(pipe)
      return pipe.pipeDown.x >= -pipe.pipeDown.width
    })
  }

  collision(pipes) {
    const { pipeDown, pipeUp } = pipes
    const birdWidth = this.bird.x + this.bird.width / 2
    const birdHeight = this.bird.y + this.bird.height / 2

    if (
      !pipes.passed &&
      birdWidth - 10 > pipeDown.x &&
      (this.bird.y - this.bird.height / 2 + 15 < pipeDown.virtualHeight || birdHeight - 15 > pipeUp.y)
    ) {
      this.onCollision()
    }


    if (this.bird.x >= pipeDown.x + pipeDown.width) {
      pipes.passed = true
    }



  }

  createPipe({ el, status, virtualHeight }) {
    return new Pipe({
      el,
      status,
      virtualHeight,
      ...this.commonProps
    })
  }

  createPipes() {
    const virtualHeight = this.randomHeight()

    const pipeDown = this.createPipe({
      el: this.pipeDownEl,
      status: PIPE_STATUS.DOWN,
      virtualHeight
    })

    const pipeUp = this.createPipe({
      el: this.pipeUpEl,
      status: PIPE_STATUS.UP,
      virtualHeight
    })

    return {
      pipeDown,
      pipeUp,
      run() {
        pipeDown.run()
        pipeUp.run()
      },
      stop() {
        pipeDown.stop()
        pipeUp.stop()
      },
      passed: false,
    }
  }

  updatePipesStack() {
    this.pipes = this.createPipes()
    this.pipesStack.push(this.pipes)
  }

  randomHeight() {
    return this.minHeight + parseFloat(Math.random() * (this.height - this.minHeight))
  }

  stop() {
    this.pause = true
    this.pipesStack.forEach(pipes => pipes.stop())
  }

  run() {
    this.runPipes()
  }
}
