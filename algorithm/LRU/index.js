//  LRU（Least recently used，最近最少使用）算法根据数据的历史访问记录来进行淘汰数据，其核心思想是“如果数据最近被访问过，那么将来被访问的几率也更高”。

// 必须满足 get 和 put 为O1的复杂度

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.cacheQueue = new Map()
  }

  get(key) {
    if (this.cacheQueue.has(key)) {
      const value = this.cacheQueue.get(key)
      this.cacheQueue.delete(key)
      this.cacheQueue.set(key, value)
    }
    return -1
  }

  set(key, value) {
    if (this.cacheQueue.has(key)) {
      this.cacheQueue.delete(key)
    }
    this.cacheQueue.set(key, value)

    if (this.cacheQueue.size > this.capacity) {
      this.cacheQueue.delete(this.cacheQueue.keys().next().value)
    }
  }
}

const lru = new LRUCache(3)

lru.set(1, 1)
lru.set(2, 1)
lru.set(3, 1)

console.log(lru.cacheQueue) //{ 1 => 1, 2 => 1, 3 => 1 }

lru.get(1)

console.log(lru.cacheQueue) // { 2 => 1, 3 => 1, 1 => 1 }

lru.set(4, 1)

console.log(lru.cacheQueue) // { 3 => 1, 1 => 1, 4 => 1 }
