async function batchRequest(requests, numbers) {
  let reqCells = []
  let result = []
  let errors = []
  if (numbers >= requests.length) {
    reqCells = [requests]
  } else {
    for (let i = 0, len = 0; i < Math.ceil(requests.length / numbers); i++) {
      reqCells.push(requests.slice(len, numbers))
      len += numbers
    }
  }

  for (const req of reqCells) {
    try {
      const r = await new Promise.all(req)
      result.push(...r)
    } catch (error) {
      errors.push(error)
    }

  }
  return {
    result,
    errors
  }
}
