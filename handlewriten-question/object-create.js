function objectCreate(proto, config) {
  function Fn() {}

  if (config) {
    Object.defineProperty(Fn, config)
  }

  Fn.prototype = proto

  return new Fn()
}
const a = objectCreate(null)
const b = Object.create(null)

console.log(a)
console.log(b)
