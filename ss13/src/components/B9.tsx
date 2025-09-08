import React, { Component } from 'react'
type State={
    company:string;
}
export default class B9 extends Component<{},State> {
    state: State={
        company:"RikkeiAcademy",
    };

    handleChange=()=>{
        this.setState({
            company:this.state.company === "Rikkei Academy"?"Rikkei Soft":"Rikkei Academy",
        })
    }
  render() {
    return (
      <div>B9
        <h2>Ten công ty:{this.state.company}</h2>
        <button onClick={this.handleChange}>Change</button>
      </div>
    )
  }
}
