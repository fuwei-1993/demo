import { SCREEN_PERCENT } from './constant.js'

export default class ImageLoader {
  loading = Symbol('loading')
  sourceTarget = '../flappyBird/source/image/flappybird/'
  imageEls = {}

  isLoadComplete() {
    return Object.values(this.imageEls)
      .map(imgs => imgs.map(img => img[this.loading]))
      .flat()
      .every(loading => !loading)
  }

  createImages() {
    return [
      this.imageCreator('bird', ['bird0_0.png', 'bird0_1.png', 'bird0_2.png']),
      this.imageCreator('bg', ['bg_day.png', 'bg_night.png']),
      this.imageCreator('land', ['land.png']),
      this.imageCreator('pipeDown', ['pipe_down.png', 'pipe2_down.png']),
      this.imageCreator('pipeUp', ['pipe_up.png', 'pipe2_up.png']),
      this.imageCreator('play', ['button_play.png']),
      this.imageCreator('title', ['title.png']),
      this.imageCreator('gameOver', ['text_game_over.png'])
    ]
  }

  imageCreator(name, imageNames) {
    return {
      name,
      src: imageNames.map(imageName => `${this.sourceTarget}${imageName}`)
    }
  }

  createImageEl(src, resolve) {
    const imageEl = new Image()
    imageEl.src = src
    imageEl[this.loading] = true
    this.bindEvent(imageEl, 'load', () => {
      imageEl.height = imageEl.height * SCREEN_PERCENT.HEIGHT
      imageEl.width = imageEl.width * SCREEN_PERCENT.WIDTH
      imageEl[this.loading] = false
      this.isLoadComplete() && resolve(this.imageEls)
    })
    return imageEl
  }


  loadSource(resolve) {
    const images = this.createImages()

    images.forEach(image => {
      this.imageEls[image.name] = image.src.map(src => {
        return this.createImageEl(src, resolve)
      })
    })
  }

  bindEvent(target, eventName, callback) {
    target.addEventListener(eventName, callback)
  }

  load() {
    return new Promise((resolve) => {
      this.loadSource(resolve)
    })
  }

}
