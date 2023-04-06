class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    this.fragment = null

    if (this.el) {
      const fragment = this.nodeToFragment(this.el)
      this.compile(fragment)
      this.el.appendChild(fragment)
    }
  }

  isElementNode = (el) => {
    return el && el.nodeType === 1
  }

  isDirective = (name) => {
    return name.includes('v-')
  }

  compile = (fragment) => {
    let childNodes = [...fragment.childNodes]

    childNodes.forEach((node) => {
      if (this.isElementNode(node)) {
        this.compileElement(node)
        this.compile(node)
      } else {
        this.compileText(node)
      }
    })
  }

  compileElement = (node) => {
    const attrs = [...node.attributes]

    attrs.forEach((attr) => {
      const attrName = attr.name

      if (this.isDirective(attrName)) {
        const type = attrName.replace(/^v-/, '')

        CompileUtils[type](node, this.vm, attr.value)
      }
    })
  }

  compileText = (node) => {
    node.textContent.replace(/\{{2}([^{}]+)\}{2}/g, (_, expr) => {
      CompileUtils['text'](node, this.vm, expr)
    })
  }

  nodeToFragment = (el) => {
    const fragment = document.createDocumentFragment()

    let firstChild
    while ((firstChild = el.firstChild)) {
      fragment.appendChild(firstChild)
    }

    return fragment
  }
}

CompileUtils = {
  getVal(vm, expr) {
    // const keys = expr.split('.')
    // return keys.reduce((result, key) => result[key], vm.$data)

    return eval(`vm.$data.${expr}`)
  },

  setVal(vm, expr, value) {
    // const keys = expr.split('.')
    // return keys.reduce((result, key, index) => {
    //   if (index === keys.length - 1) {
    //     result[key] = value
    //   }
    //   return result[key]
    // }, vm.$data)
    return eval(`vm.$data.${expr} = value`)
  },

  bindWatcher(node, vm, expr, update) {
    new Watcher(vm, expr, (nextVal, currVal) => {
      update(node, nextVal, currVal)
    })
  },

  text(node, vm, expr) {
    const templateTextUpdate = this.updater['templateTextUpdate']

    this.bindWatcher(...arguments, templateTextUpdate)

    templateTextUpdate(node, this.getVal(vm, expr), `{{${expr}}}`)
  },

  model(node, vm, expr) {
    const modelUpdate = this.updater['modelUpdate']

    this.bindWatcher(...arguments, modelUpdate)

    node.addEventListener('input', ({ target }) => {
      this.setVal(vm, expr, target.value)
    })

    modelUpdate(node, this.getVal(vm, expr))
  },

  updater: {
    textUpdate(node, value) {
      node.textContent = value
    },

    templateTextUpdate(node, nextVal, currVal) {
      CompileUtils.updater.textUpdate(
        node,
        node.textContent.replace(currVal, nextVal)
      )
    },

    modelUpdate(node, value) {
      node.value = value
    },
  },
}
