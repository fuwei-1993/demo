class Routers {
  constructor(){
    this.routes = {}
    this.currentUrl = ''
    this.history = []
    this.currentIndex = this.history.length - 1
    window.addEventListener('load', this.refresh)
    window.addEventListener('hashchange', this.refresh)
  }

  route = (path, callback) => {
    this.routes[path] = callback 
  }

  refresh = () => {
    this.currentUrl = location.hash.slice(1) || '/'
    this.history.push(this.currentUrl)
    this.currentIndex++
    this.routes[this.currentUrl]()
  }

  backOff = () => {
    console.log(this.history)
    this.currentIndex <= 0 
      ? this.currentIndex = 0
      : this.currentIndex -= 1
      console.log(this.currentIndex)
    location.hash = `#${this.history[this.currentIndex]}`
    
    this.routes[this.history[this.currentIndex]]()
  }
}

window.Router = new Routers()

function onChangeBgColor (color) {
  document.body.style.backgroundColor = color
}


Router.route('/', function(){
  onChangeBgColor('yellow')
})

Router.route('/blue', function(){
  onChangeBgColor('blue')
})

Router.route('/green', function(){
  onChangeBgColor('green')
})

document.querySelector('button').addEventListener('click',Router.backOff)