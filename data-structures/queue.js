// 队列 必须满足先进先出 就像现实中的排队

class Queue {
  count  = 0
  lowestCount = 0
  items = {}

  enqueue(element) {
    this.items[this.count] = element
    this.count++
  }

  dequeue() {
    if(this.isEmpty()) return undefined

    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++

    return result
  }
  // 查看头部元素
  peek() {
    if(this.isEmpty()) return undefined

    return this.items[this.lowestCount]
  }

  isEmpty() {
    return this.count - this.lowestCount === 0
  }

  size() {
    return this.count - this.lowestCount
  }
}

// 循环队列 -- 击鼓传花游戏

function hotPotato(elementsList, num) {
  const queue = new Queue()
  const eliminatedList = []

  for( let i = 0; i < elementsList.length; i++ ) {
    queue.enqueue(elementsList[i])
  } 

  while(queue.size() > 1) {
    for(let i = 0; i< num; i++) {
      queue.enqueue(queue.dequeue())
    }

    eliminatedList.push(queue.dequeue())
  }

  return {
    eliminatedList,
    winner: queue.dequeue()
  }
}

const names = ['John', 'Jack', 'Camilla', 'Ingrid', 'Carl']

const result = hotPotato(names, 9)

result.eliminatedList.forEach(name => {
  console.log(`${name} 在击鼓传花中被淘汰`)
})

console.log(`${result.winner} 在击鼓传花中获胜`)