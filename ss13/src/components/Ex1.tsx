import React, { Component } from 'react'

interface Props{}
interface State{
    name:string;
}


export default class Ex1 extends Component <Props,State>{
    constructor ( props:Props){
        super(props);
        this.state={
            name:"Pham Ngoc Linh"
        }
    }
  render() {
    return (
      <div>Ex1
        <h1>My name is: {this.state.name}</h1>

      </div>
    )
  }
}
