/*
**  ts内置装饰器类型
*/

function ClassDecoratorFactory(type: number): number
function ClassDecoratorFactory(type: string): ClassDecorator
function ClassDecoratorFactory(type: any): number | ClassDecorator {
  if(typeof type === 'string') {
    return (target) => { 
      return target
    }
  }
  return 123
  
}

function MethodDecoratorFactory() : MethodDecorator {
  return function (target, propertyKey, descriptor)  {
    return descriptor
  }
}

interface  TypedAssertArg <T>{
  value?: T
}

const someValue: any = 123
const assert:(<T>(a:string, b: TypedAssertArg<T>) => T | undefined) = function(a, b) {
  return b.value
}

assert('123', {value: () => {}})

@ClassDecoratorFactory('234')
class Test {
  @MethodDecoratorFactory()
  onTest(test: string) {
    console.log('onTest', test)
  }
}

new Test().onTest('test')

const RequiredMap = new WeakMap()

const requiredMetadataKey: unique symbol = Symbol('required')

function Require(target: object, propertyKey: string | symbol, parameterIndex: number) {
  const rewriteTarget = target as Record<string | symbol, any>
  // console.log(target,rewriteTarget[propertyKey])
  // const exitingRequiredParamter: number[] = RequiredMap.set() || []
}

class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }

  greet(@Require name: string) {

  }
}

//自带的装饰类型就感觉很局限