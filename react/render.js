import createReactUnit from './unit.js'

const nextRootIndex = 0

function render(ele, container) {
  const reactUnitInstance = createReactUnit(ele)
  const markUp = reactUnitInstance.getDom(nextRootIndex)
  
  container.appendChild(markUp)
}

export default render