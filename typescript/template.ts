// 此类型体操是通过和infer的结合来完成的。
// 请在理解之前 先理解infer的含义

const str = 'abc'

console.log(str.replace(/a(b)c/, '$1,$1,$1')) //b, b, b

type Replace<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Left}${From}${infer Right}`
  ? `${Left}${To}${Right}`
  : Str
type ResStr = Replace<'付威是帅哥～～～', '帅哥', '你爹'>

type TrimLeft<Str extends string> = Str extends `${' ' | '\t' | '\n'}${infer R}`
  ? TrimLeft<R>
  : Str
type ResStr1 = TrimLeft<'   你爸爸'>

type TrimRight<Str extends string> = Str extends `${infer R}${
  | ' '
  | '\t'
  | '\n'}`
  ? TrimRight<R>
  : Str
type ResStr2 = TrimRight<'你爸爸   '>

type Trim<Str extends string> = TrimRight<TrimLeft<Str>>
type ResStr3 = Trim<'   你爸爸   '>
// 数组类型的匹配模式

type Pop<T extends unknown[]> = T extends [...infer Rest, infer R]
  ? Rest
  : never

type Res = Pop<['付威', '你爸爸']>

type Shift<T extends unknown[]> = T extends [infer R, ...infer Rest]
  ? Rest
  : never

type Res1 = Shift<['付威', '你爸爸']>
