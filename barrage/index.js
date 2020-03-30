const barrages = [
  { value: '我你是威爸爸', time: 10, fontSize: 15, color: 'red', speed: 2 },
  { value: '我还你是威爸爸', time: 1, fontSize: 12, color: 'white', speed: 3 }
]

class Barrage {

}

class CanvasBarrage {
  constructor({ video, barrages, canvas }) {
    this.video = video
    this.barrages = barrages
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.init()
  }
  init() {
    this.canvas.width = this.video.width
    this.canvas.height = this.video.height
  }
  renderCanvasBarrage() {

  }
  render() { }
}

const video = document.querySelector('#video')
const canvas = document.querySelector('#canvas')

export default new CanvasBarrage({
  video,
  canvas,
  barrages
})