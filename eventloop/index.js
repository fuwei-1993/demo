
const PRIORITY = {
  HEIGH: 1,
  MID: 2,
  LOW: 3
}

class BaseTask {
  priority = new Error()
  queue = []
  afterCallBack = () => { }
  __callback = () => { }
  callback() {
    this.__callback()
    this.afterCallBack()
  }

  constructor(callback, queue = []) {
    this.__callback = callback
    this.queue = queue
  }

  create() {
    return null
  }

  add(callback, queue = []) {
    return this.create(callback, queue)
  }
}

class Task extends BaseTask {
  priority = PRIORITY.HEIGH
  create(...arg) {
    return new Task(...arg)
  }

}

class MicroTask extends BaseTask {
  priority = PRIORITY.MID
  create(...arg) {
    return new MicroTask(...arg)
  }
}

class MacroTask extends BaseTask {
  priority = PRIORITY.LOW
  create(...arg) {
    return new MacroTask(...arg)
  }
}

function executor(queue = [], {
  jobsQueue = [],
  taskQueue = [],
  heighLevelQueue = []
}, runTaskList) {
  if (!queue.length) return

  while (queue.length) {
    const currentTask = queue.shift()
    switch (currentTask.priority) {
      case PRIORITY.HEIGH:
        currentTask.afterCallBack = () => {
          executor(currentTask.queue, {
            taskQueue,
            jobsQueue,

          }, ({ heighLevelQueue }) => runTaskList({ heighLevelQueue }))
        }
        heighLevelQueue.push(currentTask)
        break
      case PRIORITY.MID:

        currentTask.afterCallBack = () => {
          executor(currentTask.queue, {
            jobsQueue,
            taskQueue,
          }, ({ heighLevelQueue }) => runTaskList({ heighLevelQueue, jobsQueue }))
        }
        jobsQueue.push(currentTask)
        break
      case PRIORITY.LOW:
        currentTask.afterCallBack = () => {
          executor(currentTask.queue, {
            jobsQueue,
            taskQueue
          },
            ({ heighLevelQueue }) => runTaskList({ heighLevelQueue, taskQueue }))
        }
        taskQueue.push(currentTask)
        break
      default:
        break

    }
  }
  runTaskList({ heighLevelQueue, jobsQueue, taskQueue })
}

function runTaskList(tasksList) {
  Object.values(tasksList).forEach(tasks => {
   
    while(tasks.length) {
      const task = tasks.shift()
      task.callback()
    }
  })
}


const task = new Task()
const microTask = new MicroTask()
const macroTask = new MacroTask()



function simulateExecution() {

  executor([
    macroTask.add(() => {
      console.log('宏任务')
    }, [macroTask.add(() => {
      console.log('宏任务儿子宏任务')
    }),task.add(()=> {
      console.log('宏任务儿子普通任务')
    })]),
    task.add(() => {
      console.log('爸爸任务')
    }, [macroTask.add(() => {
      console.log('儿子宏任务')
    }), task.add(() => {
      console.log('儿子任务')
    }, [macroTask.add(() => {
      console.log('儿子任务的宏任务')
    })])]),

    microTask.add(() => {
      console.log('微任务')
    }, [task.add(() => {
      console.log('微任务儿子任务')
    }), macroTask.add(() => {
      console.log('微任务儿子宏任务')
    })])
  ], {}, runTaskList)

}

simulateExecution()
