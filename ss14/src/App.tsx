import { Component } from 'react'
import './App.css'
import LifecyleMethod from './Components/LifecyleMethod'

type StateTypes = {
  isShow: boolean;
  random: number;
}

export default class App extends Component<object, StateTypes> {
  constructor(props: object) {
    super(props);
    this.state = {
      isShow: false,
      random: 0,
    }
  }

  handleToggle = () => {
    this.setState({
      isShow: !this.state.isShow,
    })
  }

  handleRandom = () => {
    this.setState({
      random: Math.ceil(Math.random() * 100) // dùng Math.ceil thay vì Math.cell
    })
  }

  render() {
    return (
      <div>
        <h1>Component APP</h1>
        <button onClick={this.handleToggle}>Toggle</button>
        <button onClick={this.handleRandom}>Random</button>

        {this.state.isShow && (
          <LifecyleMethod random={this.state.random} />
        )}
      </div>
    )
  }
}
