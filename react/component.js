class Component {
  constructor(props) {
    this.props = props
    this.state = {}
  }

  render() {
    return new Error('render抽象方法必须实现！')
  }

  setState() {
    console.log('update')
    this.render()
  }
}

export default Component