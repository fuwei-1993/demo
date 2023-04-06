const plays = {
  hamlet: {
    name: 'Hamlet',
    type: 'tragedy',
  },
  'as-like': {
    name: 'As You Like It',
    type: 'comedy',
  },
  othello: {
    name: 'Othello',
    type: 'tragedy',
  },
}

const invoices = [
  {
    customer: 'BigCo',
    performances: [
      {
        playID: 'hamlet',
        audience: 55,
      },
      {
        playID: 'as-like',
        audience: 35,
      },
      {
        playID: 'othello',
        audience: 40,
      },
    ],
  },
]

function renderPlainText(data) {
  let result = `Statment for ${data.customer}\n`
  for (let perf of data.performances) {
    result += `${perf.play.name} owed is ${perf.amount / 100} (${
      perf.audience
    } seats)\n`
  }
  result += `Amount owed is ${data.totalAmount / 100}\n`
  result += `You earned ${data.totalVolumeCredits} credits\n`
  return result
}

function renderHtml(data) {
  let result = `<h1>Statement for ${data.customer}</h1>\n`
  result += '<table>\n'
  result += '<tr><th>play</th><th>seats</th><th>cost</th></tr>'
  for (let perf of data.performances) {
    result += `<tr><td>${perf.play.name}</td><td>${perf.audience}</td>`
    result += `<td>${perf.amount / 100}</td>`
  }
  result += '</table>\n'
  result += `Amount owed is ${data.totalAmount / 100}\n`
  result += `You earned ${data.totalVolumeCredits} credits\n`

  return result
}

function htmlStatement(invoice) {
  return renderHtml(createStatementData(invoice))
}

function statement(invoice) {
  return renderPlainText(createStatementData(invoice))
}

function createStatementData(invoice) {
  const statementData = {}
  statementData.customer = invoice.customer
  statementData.performances = invoice.performances.map(enrichPerformance)
  statementData.totalAmount = totalAmount(statementData)
  statementData.totalVolumeCredits = totalVolumeCredits(statementData)
  return statementData
}

function enrichPerformance(aPerformance) {
  const calulator = createPerformanceCalculator(
    aPerformance,
    playFor(aPerformance)
  )
  const result = Object.assign({}, aPerformance)
  result.play = calulator.play
  result.amount = calulator.amount
  result.volumeCredits = calulator.volumeCredits
  return result
}

function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case 'tragedy':
      return new TragedyCalculator(aPerformance, aPlay)
    case 'comedy':
      return new ComedyCalculator(aPerformance, aPlay)
  }
}

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance
    this.play = aPlay
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0)
  }

  get amount() {
    throw new Error(`unknown type: ${this.performance.play.type}`)
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30)
    }
    return result
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20)
    }
    result += 300 * this.performance.audience
    return result
  }

  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5)
  }
}

function totalVolumeCredits(data) {
  return data.performances.reduce(
    (total, curr) => total + curr.volumeCredits,
    0
  )
}

function totalAmount(data) {
  return data.performances.reduce((total, curr) => total + curr.amount, 0)
}

function playFor(aPerformance) {
  return plays[aPerformance.playID]
}

console.log(statement(invoices[0]))
document.body.innerHTML = htmlStatement(invoices[0])
