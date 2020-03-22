function padding(all: number): object;
function padding(topAndBottom: number, leftAndRight: number): object;
function padding(top: number, right: number, bottom: number, left: number): object;
// Actual implementation that is a true representation of all the cases the function body needs to handle
function padding(a: number, b?: number, c?: number, d?: number) {
  if (b === undefined && c === undefined && d === undefined) {
    b = c = d = a;
  } else if (c === undefined && d === undefined) {
    c = a;
    d = b;
  }
  return {
    top: a,
    right: b,
    bottom: c,
    left: d
  };
}

console.log(padding(23))

console.log(padding(23, 11))

interface ReturnString {
  (): string
}

declare const foo: ReturnString


interface Complex {
  (foo: string, bar?: number, ...others: boolean[]): number
}

interface OverLoaded {
  (foo: string): string
  (foo: number): number
}

function stringOrNumber(foo: number): number;
function stringOrNumber(foo: string): string;

function stringOrNumber(foo: any): any {
  if(typeof foo === 'number') return foo * foo
  if(typeof foo === 'string') return `hello ${foo}`
  const err: Error = new Error('使用错误')
  return  err
}

const overLoaded: OverLoaded = stringOrNumber

 overLoaded('234')
 overLoaded(123)


 const simple: (foo: number) => string = foo => foo.toString() 

 console.log(simple(123))