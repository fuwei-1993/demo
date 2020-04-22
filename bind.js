function Animal(name, color) {
  this.name = name
  this.color = color
  console.log(this)
}

Animal.prototype.say = function () {
  return `I'm a ${this.color} ${this.name}`
}

Animal.apply = function (target, arg) {
  if (target && typeof target === 'object') {
    target.fn = this
    const result = target.fn(...arg)
    delete target.fn
    return result
  }
  return this(...arg)
}

Animal.myBind = function (target, arg) {
  const that = this

  function result(...args) {
    const isNew = this instanceof result
    return that.apply(isNew ? this : target, [arg, ...args])
  }

  result.prototype = Object.create(this.prototype)
  result.constructor = this
  return result
}

const Cat = Animal.myBind({}, 'cat')

const cat = new Cat('white')

if (
  cat.say() === "I'm a white cat" &&
  cat instanceof Cat &&
  cat instanceof Animal
) {
  console.log('success')
}
