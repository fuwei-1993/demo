interface IIcon<T> {
  color: string
  size: string
  bg?: string
  component: (props: T) => {}
}

interface IProps {
  name: string
}


class Icon implements IIcon<IProps> {
  color: string
  size: string
  constructor(props) {
    this.color = props.color
    this.size = props.size
  } 

  component(props) {
    return {}
  }
}

new Icon({
  color: 'red',
  size: '10'
})