

class Animal  {
  height?: number;
  weight?: number;
  name?: string
}

class Dog extends Animal {
  height = 20
  weight = 20

  dogCall () {
    console.log('i am a dog')
  }
}

class Greyhound extends Dog {
  color = 'gray'
}

function covAnimal(params: Animal): Animal {
  return params
}

function covDog(params: Dog): Dog {
  return params
}

covAnimal(new Dog()) // 返回值是协变的

// covDog(new Animal()) //参数是逆变的 Animal 中没有dogCall的方法