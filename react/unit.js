import Component from './component.js'
import { isReactElement } from './utils/index.js'

class Unit {
  constructor(element) {
    this.reactElement = element
  }

  getDom(rootId) {
    const markUp = this.getMarkUp(rootId)
    const fragment = document.createElement('div')
    fragment.innerHTML = markUp
    return fragment.children[0]
  }

  getMarkUp(rootId) {
    return new Error('抽象方法必须实现')
  }
}

class ReactTextUnit extends Unit {
  getMarkUp(rootId) {
    return this.reactElement
  }
}

class ReactElementUnit extends Unit {
  getMarkUp(rootId) {
    const { type, props } = this.reactElement
    const { children = [] } = props
    let markUpStart = `<${type} data-reactid=${rootId}`
    const markUpEnd = `</${type}>`

    for (const key in props) {
      if (/^on[A-Z]/.test(key)) {
        const eventName = key.toLocaleLowerCase().slice(2)
        const event = props[key]

        this.eventDelegate({
          eventName,
          event,
          rootId
        })
      } else if (key !== 'children') {
        markUpStart += ` ${key}=${props[key]}`
      }
    }

    const markUps = children.map((child, index) => createReactUnit(child).getMarkUp(`${rootId}.${index}`)).join('')

    return markUpStart + '>' + markUps + markUpEnd

  }

  eventDelegate({
    eventName,
    event,
    rootId
  }) {
    document.addEventListener(eventName, (e) => {
      const delegateId = e.target.getAttribute('data-reactid')
      if (delegateId && delegateId.includes(rootId)) {
        event.call(e.target, e)
      }
    })
  }
}

class ReactComponentUnit extends Unit {
  getMarkUp(rootId) {
    const { type: ReactComponent, props } = this.reactElement
    const reactInstance = new ReactComponent(props)
    const { 
      componentDidMount = () => null, 
      componentWillMount = () => null 
    } = reactInstance

    componentWillMount()

    const reactInstanceRenderer = reactInstance.render()

    const result = createReactUnit(reactInstanceRenderer).getMarkUp(rootId)

    componentDidMount()

    return result
  }
}



function createReactUnit(element) {
  if (typeof element === 'string' || typeof element === 'number') {
    return new ReactTextUnit(element)
  }

  if (isReactElement(element)) {

    if (element.type.__proto__ === Component) {
      return new ReactComponentUnit(element)
    }

    return new ReactElementUnit(element)
  }

  return new Unit(element)

}

export default createReactUnit