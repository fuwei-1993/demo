type TArea = (width: number, height: number) => number

type MyParameters<T extends (...arg: any[]) => any> = T extends (...arg: infer P) => any ? P : never

// type TAreaParam = Parameters<TArea>
type TAreaParam = MyParameters<TArea>

type MyReturnType<T extends (...arg: any) => any> = T extends (...arg: any) => infer R ? R : any

// type TAreaReturn = ReturnType<TArea>
type TAreaReturn = MyReturnType<TArea>