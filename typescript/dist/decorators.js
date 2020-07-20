"use strict";
/*
**  ts内置装饰器类型
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function ClassDecoratorFactory(type) {
    if (typeof type === 'string') {
        return (target) => {
            return target;
        };
    }
    return 123;
}
function MethodDecoratorFactory() {
    return function (target, propertyKey, descriptor) {
        return descriptor;
    };
}
const someValue = 123;
const assert = function (a, b) {
    return b.value;
};
assert('123', { value: () => { } });
let Test = class Test {
    onTest(test) {
        console.log('onTest', test);
    }
};
__decorate([
    MethodDecoratorFactory()
], Test.prototype, "onTest", null);
Test = __decorate([
    ClassDecoratorFactory('234')
], Test);
new Test().onTest('test');
const RequiredMap = new WeakMap();
const requiredMetadataKey = Symbol('required');
function Require(target, propertyKey, parameterIndex) {
    const rewriteTarget = target;
    // console.log(target,rewriteTarget[propertyKey])
    // const exitingRequiredParamter: number[] = RequiredMap.set() || []
}
class Greeter {
    constructor(message) {
        this.greeting = message;
    }
    greet(name) {
    }
}
__decorate([
    __param(0, Require)
], Greeter.prototype, "greet", null);
//自带的装饰类型就感觉很局限
