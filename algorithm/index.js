function fisherYatesShuffle(arr) {
  // for (let i = 0; i < arr.length - 1; i++) {
  //   const j = i + Math.floor(Math.random() * (arr.length - i))
  //   [arr[i], arr[j]] = [arr[j], arr[i]]
  // }
  
  // return arr
  const i = 1
  const j = 2
  [arr[0], arr[1]] = [arr[1], arr[0]]
  return arr
}

const arr = [1,2,3,4,5,6,7,8]


console.log(fisherYatesShuffle(arr))