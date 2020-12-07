interface LazyManClassConstructor {
  new (name: string): LazyManClassInterface
}

interface LazyManClassInterface {
  name: string
  sleep(time: number): LazyManClassInterface
  eat(sth: string): LazyManClassInterface
  sleepFirst(time: number): LazyManClassInterface
}

class LazyManClass implements LazyManClassInterface {
  constructor(name: string) {
    this.name = name
    console.log(`Hi I am ${name}`)
    setTimeout(() => {
      this.next()
    })
  }
  name: string

  private queue: ((...arg: any[]) => void)[] = []

  private next() {
    const current = this.queue.shift()
    current && current()
  }

  private exec(time: number) {
    setTimeout(() => {
      console.log(`Waiting ${time} s ...`)
      this.next()
    }, time)
  }

  sleep(time: number): LazyManClassInterface {
    this.queue.push(() => {
      this.exec(time)
    })
    return this
  }

  eat(sth: string): LazyManClassInterface {
    this.queue.push(() => {
      console.log(`I am eating ${sth}`)
      this.next()
    })
    return this
  }

  sleepFirst(time: number): LazyManClassInterface {
    this.queue.unshift(() => {
      this.exec(time)
    })
    return this
  }
}

function createLazyMan(
  lazy: LazyManClassConstructor,
  name: string
): LazyManClassInterface {
  return new lazy(name)
}

const lazyMan = createLazyMan.bind(null, LazyManClass)
const lunchLazyMan = createLazyMan.bind(null, LazyManClass)
const dinerLazyMan = createLazyMan.bind(null, LazyManClass)

lazyMan('Tony')
// Hi I am Tony
lazyMan('Smith').sleep(10).eat('lunch')
// Hi I am Tony
// 等待了 10 秒...
// I am eating
lunchLazyMan('Tony').eat('lunch').sleep(10).eat('dinner')
// Hi I am Tony
// I am eating lunch// 等待了 10 秒...
// I am eating
dinerLazyMan('Tony')
  .eat('lunch')
  .eat('dinner')
  .sleepFirst(5)
  .sleep(10)
  .eat('junk food')
// Hi I am Tony// 等待了 5 秒...
// I am eating lunch
// I am eating dinner
// 等待了 10 秒...
// I am eating junk food
