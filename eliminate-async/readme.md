### 消除函数的异步传染

```ts
// 我们要实现这样的逻辑, 就意味着main必须是异步的，才能获取异步函数fetch中的结果， 这个叫异步”具有传染性，然而它是有副作用的，我们打算消除它
async function main() {
  try {
    const result = await fetch()
    handleResult(result)
  } catch (error) {
    handleError(error)
  }
}

await main()
```