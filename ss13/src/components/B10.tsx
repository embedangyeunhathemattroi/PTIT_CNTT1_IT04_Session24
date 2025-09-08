import React, { Component } from 'react'

export default class Input extends Component {
  state = { value: "" }

  render() {
    return (
      <div>
        <h2>Dữ liệu: {this.state.value}</h2>
        <input 
          type="text" 
          onChange={(e) => this.setState({ value: e.target.value })} 
        />
      </div>
    )
  }
}
