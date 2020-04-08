import Platform from './platform.js'
import ImgLoader from './imgLoader.js'
class Game {
  initGame(callback) {
    new ImgLoader().load().then(callback)
  }

  start() {
    this.initGame(imgEls => {
      new Platform(imgEls)
    })
  }
}

new Game().start()
