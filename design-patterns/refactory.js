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
    result += `<td>${perf.amount}</td>`
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
  const result = Object.assign({}, aPerformance)
  result.play = playFor(result)
  result.amount = amountFor(result)
  result.volumeCredits = volumeCreditsFor(result)
  return result
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

function volumeCreditsFor(aPerformance) {
  let result = 0
  result += Math.max(aPerformance.audience - 30, 0)
  if ('comedy' === aPerformance.play.type)
    result += Math.floor(aPerformance.audience / 5)
  return result
}

function playFor(aPerformance) {
  return plays[aPerformance.playID]
}

function amountFor(aPerformance) {
  let result = 0
  switch (aPerformance.play.type) {
    case 'tragedy':
      result = 40000
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30)
      }
      break
    case 'comedy':
      result = 30000
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20)
      }
      result += 300 * aPerformance.audience
      break
    default:
      throw new Error(`unknown type: ${aPerformance.play.type}`)
  }
  return result
}

console.log(statement(invoices[0]))
document.body.innerHTML = htmlStatement(invoices[0])
