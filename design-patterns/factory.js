//4. 工厂模式
// 4.1 简单工厂模式
// 简单工厂模式是由一个工厂对象决定创建出哪一种产品类的实例

class Plant {
  constructor(name) {
    this.name = name
  }
  grow() {
    console.log('growing~~~')
  }
}

class Apple extends Plant {
  constructor(name) {
    super(name)
    this.taste = '甜'
  }
}

class Orange extends Plant {
  constructor(name) {
    super(name)
    this.taste = '酸'
  }
}

class Factory {
  static create(name) {
    switch (name) {
      case 'apple':
        return new Apple('苹果')
      case 'orange':
        return new Orange('橘子')
    }
  }
}
const apple = Factory.create('apple')
console.log(apple)
const orange = Factory.create('orange')
console.log(orange)

// 4.1.3.1 jQuery
// class jQuery{
//     constructor(selector){
//         let elements = Array.from(document.querySelectorAll(selector));
//         let length = elements?elements.length:0;
//         for(let i=0;i<length;i++){
//             this[i]=elements[i];
//         }
//         this.length = length;
//     }
//     html(){

//     }
// }
// window.$ = function(selector){
//    return new jQuery(selector);
// }
// 4.1.3.2 React
// class Vnode{
//     constructor(tag,attrs,children){
//         this.tag = tag;
//         this.attrs = attrs;
//         this.children = children;
//     }
// }
// React.createElement = function(tag,attrs,children){
//   return new Vnode(tag,attr,children);
// }

// 4.2 工厂方法模式
// 工厂方法模式Factory Method，又称多态性工厂模式。
// 在工厂方法模式中，核心的工厂类不再负责所有的产品的创建，而是将具体创建的工作交给子类去做。

class Plant {
  constructor(name) {
    this.name = name
  }
  grow() {
    console.log('growing~~~')
  }
}
class Apple extends Plant {
  constructor(name) {
    super(name)
    this.taste = '甜'
  }
}
class Orange extends Plant {
  constructor(name) {
    super(name)
    this.taste = '酸'
  }
}

class AppleFactory {
  create() {
    return new Apple()
  }
}

class OrangeFactory {
  create() {
    return new Orange()
  }
}
const settings = {
  apple: AppleFactory,
  orange: OrangeFactory,
}

const _apple = new settings['apple']().create()
console.log(_apple)
const _orange = new settings['orange']().create()
console.log(_orange)

// 抽象工厂模式 #
// 抽象工厂模式是指当有多个抽象角色时，使用的一种工厂模式
// 抽象工厂模式可以向客户端提供一个接口，使客户端在不必指定产品的具体的情况下，创建多个产品族中的产品对象

class Button {
  render() {}
}

class AppleButton {
  render() {
    console.log('苹果按钮')
  }
}

class WindowsButton {
  render() {
    console.log('windows按钮')
  }
}

class Icon {
  render() {}
}

class AppleIcon {
  render() {
    console.log('苹果icon')
  }
}

class WindowsIcon {
  render() {
    console.log('winodws icon')
  }
}

class Factory {
  createButton() {}
  createIcon() {}
}

class AppleFactory {
  createButton() {
    return new AppleButton()
  }
  createIcon() {
    return new AppleIcon()
  }
}

class WindowsFactory {
  createButton() {
    return new WindowsButton()
  }
  createIcon() {
    return new WindowsIcon()
  }
}

const Setting = {
  apple: AppleFactory,
  windows: WindowsFactory,
}

const appleFactory = new settings['apple']()
appleFactory.createButton().render()
appleFactory.createIcon().render()

const windowsFactory = new settings['windows']()
windowsFactory.createButton().render()
windowsFactory.createIcon().render()
