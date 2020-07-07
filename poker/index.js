class Poker {
  constructor({ suit, point }) {
    this.suit = suit
    this.point = point
  }
}

class PokerTable { 
  suits = ['S', 'H', 'C', 'D']
  points = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
  ]
  pokers = []

  createPokers(Poker) {
    this.suits.forEach(suit => {
      this.points.forEach(point => { 
        this.pokers.push(new Poker({suit, point}))
      })
    });
    return this.pokers
  }

  shufflingPokers() { 
    this.pokers.forEach((_, index) => { 
      const randomIndex = Math.floor(this.pokers.length * Math.random())
      let temp = this.pokers[index] 
      this.pokers[index] = this.pokers[randomIndex]
      this.pokers[randomIndex] = temp
    })
  }

}


const table = new PokerTable()

const pokers = table.createPokers(Poker)
table.shufflingPokers()
console.log(pokers)