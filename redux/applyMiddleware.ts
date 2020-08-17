import {
  StoreEnhancer,
  StoreEnhancerStoreCreator,
  PreloadedState,
  Dispatch,
} from './types/store'
import { Middleware, MiddlewareAPI } from './types/middleware'
import { AnyAction } from './types/actions'
import { Reducer } from './types/reducers'
import compose from './compose'

/**
 *  Creates a store enhancer that applies middleware to the dispatch method
 *  of the Redux store. This is handy for a variety of tasks, such as expressing
 *  asynchronous actions in a concise manner, or logging every action payload.
 *
 * @param middlewares The middleware chain to be applied
 * @returns A store enhancer applying the middleware
 *
 * @template Ext Dispatch signature added by a middleware
 * @template S The type of the state  supported by a middleware
 */
function applyMiddleware(): StoreEnhancer
function applyMiddleware<Ext1, S>(
  middleware1: Middleware<Ext1, S, any>
): StoreEnhancer<{ dispatch: Ext1 }>
function applyMiddleware<Ext1, Ext2, S>(
  middleware1: Middleware<Ext1, S, any>,
  middleware2: Middleware<Ext2, S, any>
): StoreEnhancer<{ dispatch: Ext1 & Ext2 }>
function applyMiddleware<Ext1, Ext2, Ext3, S>(
  middleware1: Middleware<Ext1, S, any>,
  middleware2: Middleware<Ext2, S, any>,
  middleware3: Middleware<Ext3, S, any>
): StoreEnhancer<{ dispatch: Ext1 & Ext2 & Ext3 }>
function applyMiddleware<Ext1, Ext2, Ext3, Ext4, S>(
  middleware1: Middleware<Ext1, S, any>,
  middleware2: Middleware<Ext2, S, any>,
  middleware3: Middleware<Ext3, S, any>,
  middleware4: Middleware<Ext4, S, any>
): StoreEnhancer<{ dispatch: Ext1 & Ext2 & Ext3 & Ext4 }>
function applyMiddleware<Ext1, Ext2, Ext3, Ext4, Ext5, S>(
  middleware1: Middleware<Ext1, S, any>,
  middleware2: Middleware<Ext2, S, any>,
  middleware3: Middleware<Ext3, S, any>,
  middleware4: Middleware<Ext4, S, any>,
  middleware5: Middleware<Ext5, S, any>
): StoreEnhancer<{ dispatch: Ext1 & Ext2 & Ext3 & Ext4 & Ext5 }>
function applyMiddleware<Ext, S = any>(
  ...middlewares: Middleware<any, S, any>[]
): StoreEnhancer<{ dispatch: Ext }>
function applyMiddleware(...middlewares: Middleware[]): StoreEnhancer<any> {
  return (createStore: StoreEnhancerStoreCreator) => <S, A extends AnyAction>(
    reducer: Reducer<S, A>,
    preloadedState?: PreloadedState<S>
  ) => {
    const store = createStore(reducer, preloadedState)
    let dispatch: Dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    }

    // 巧妙的将 store 切出 getState 和 dispatch  
    // 这步操作很迷 其实要拿 state 只需要 getState 方法, 为啥需要dispatch
    const middlewareAPI: MiddlewareAPI = {
      getState: store.getState,

      // 这里的 dispatch 很迷 
      // 1、 和 dispatch: dispatch 有啥区别
  		// 2、 dispatch 是上面那个抛错的 dispatch 但是实际跑的时候却不是
      dispatch: (action, ...args) => dispatch(action, ...args),
    }

    
    // 这步实际是将所有的 middleware 科里化 middlewareAPI
    // middleware1 = (store) => {...} 这里的 store 就表示 middlewareAPI
    const chain = middlewares.map((middleware) => middleware(middlewareAPI))

    
    // const middlewareCurryStore =  middleware(middlewareAPI)
    // compose: (dispatch) => middlewareCurryStore1(middlewareCurryStore2(dispatch)) 将 dispatch 科里化
    // 赋值操作是说将 compose 出来的函数来对现有的 dispatch 进行增强
    // 所以在 next => {...} 里去调用 dispatch 就会递归栈溢出， 所以这个 dispatch 暴露出来是干嘛的 ？
    dispatch = compose<typeof dispatch>(...chain)(store.dispatch) 

    
    return {
      ...store,
      dispatch,
    }
  }
}

export default applyMiddleware
