class Power {
  charge() {
    return '220v'
  }
}

class Adapter {
  constructor() {
    this.power = new Power()
  }

  charge() {
    const power = this.power.charge()
    return `${power} => 12V`
  }
}

class Client {
  constructor() {
    this.adapter = new Adapter()
  }

  use() {
    console.log(this.adapter.charge())
  }
}
new Client().use()