import { Element } from '../createElement.js'


export const isReactElement = (element) => {
  return element instanceof Element
}