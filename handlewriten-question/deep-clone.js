const target = {
  name: 'fuwei',
  skill: [
    {
      name: 'javascript',
      level: '5'
    },
    {
      name: 'typescript',
      level: '5'
    }
  ],
  born: new Date('1993-07-23'),
  reg: /帅/,
  height: '199cm'
}

function deepClone (origin, hashMap = new Map) {
  if(typeof origin !== 'object' || typeof origin == undefined) {
    return origin
  }

  if(origin instanceof Date) {
    return new Date(origin)
  }

  if(origin instanceof RegExp) {
    return new RegExp(origin)
  }

  if(hashMap.get(origin)) {
    return hashMap.get(origin)
  }

  const result = new origin.constructor()
  hashMap.set(origin, result)

  for(let key in origin) {
    if(origin.hasOwnProperty(key)) {
      result[key] = deepClone(origin[key], hashMap)
    }
  }

  return result
}

const newObject = deepClone(target)
newObject.skill[2] = {
  skill: '吹牛皮'
}
console.log(newObject)
console.log(target)

// 循环引用

const test1 = {
  a: 123
}
const test2= {
  b: 234
}

test1.test2 = test2
test2.test1 = test1

console.log(deepClone(test1))