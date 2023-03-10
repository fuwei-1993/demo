const javascript = `
  // Worker 的名字。该属性只读，由构造函数指定。
  // self.name
  // 接收主线程消息
  // self.onmessage
  // 指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
  // self.onmessageerror
  // 向主线程发消息
  // self.postMessage
  // 加载一段js
  // self.importScripts
  // 关闭work线程
  // self.close
  //
  self.postMessage('React')

`;

// Worker.onerror：指定 error 事件的监听函数。
// Worker.onmessage：指定 message 事件的监听函数，发送过来的数据在Event.data属性中。
// Worker.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
// Worker.postMessage()：向 Worker 线程发送消息。
// Worker.terminate()：立即终止 Worker 线程。

const blob = new Blob([javascript], { type: 'application/javascript' });
const url = window.URL.createObjectURL(blob);
const worker = new Worker(url);



worker.onmessage = (event) => {
  console.log(event) // 消息;
}

