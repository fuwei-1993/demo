export class Element {
  constructor({ type, defaultProps, children }) {
    this.type = type
    this.props = {...defaultProps, children }
  }
}

function createElement(type, props, ...children) {
  const defaultProps = props || {}
  return new Element({ type, defaultProps, children })
}

export default createElement


//virtaul dom

// {
//   type: 'div',
//   props: {
//     name: 234,
//     methods: {
//      onClick() {
//        console.log('click reactive')
//      }
//     }
//     children: [
//       'hellow',
//       {
//         type: 'a',
//         children: ['点我']
//       }
//     ]
//   }
// }