/*
 **  ts内置装饰器类型
 */

function ClassDecoratorFactory(type: number): number
function ClassDecoratorFactory(type: string): ClassDecorator
function ClassDecoratorFactory(type: any): number | ClassDecorator {
  if (typeof type === 'string') {
    return (target) => {
      return target
    }
  }
  return 123
}

function MethodDecoratorFactory(): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    return descriptor
  }
}

interface TypedAssertArg<T> {
  value?: T
}

const someValue: any = 123
const assert: <T>(a: string, b: TypedAssertArg<T>) => T | undefined = function (
  a,
  b
) {
  return b.value
}

assert('123', { value: () => {} })

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

function Require(target: object, propertyKey: string, parameterIndex: number) {
  const rewriteTarget = target as Record<
    typeof propertyKey,
    (...arg: any[]) => any
  >
  const exitingRequiredParamter: number[] =
    RequiredMap.get(rewriteTarget[propertyKey]) || []
  exitingRequiredParamter.push(parameterIndex)
  RequiredMap.set(rewriteTarget[propertyKey], exitingRequiredParamter)
}

function Validate(
  target: object,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<(...arg: any[]) => any>
) {

  const method = descriptor.value as (...arg: any[]) => any

  descriptor.value = function (...arg) {
    let requiredParamter: number[] = RequiredMap.get(method)
    if (requiredParamter) {
      for (const parameterIndex of requiredParamter) {
        if (parameterIndex >= arg.length || !arguments[parameterIndex]) {
          throw new Error('paramter is required')
        }
      }
    }
    return method.apply(this, arg)
  }
}

class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }
  @Validate
  greet(@Require name: string, @Require height: number) {}
}

new Greeter('1123').greet('1', 2)

