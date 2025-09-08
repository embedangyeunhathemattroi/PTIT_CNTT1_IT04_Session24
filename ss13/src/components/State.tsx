import React, { Component } from 'react'
type InitialState={
    isLogin:boolean,
    name:string,
    student:student[],

}
export default class Học  extends Component<{},InitialState>{
    constructor(props:{}){
        super(props);
        this.state={
            name:"Minh Thu",
            student:["Hoa","ngoc","Lan"],
            isLogin:true
        }
    }
    
  render() {
    return (
      <div>
        <hr />
        Học về State trong ReactJs
        <p>Ten Sinh Vien :{this.state.name}</p>
        <button onClick={this.handleChangeName}>ChangeName</button>
        <ul>
            {this.state.student.map((item, index)=><li key={index}>{item}</li>)}
        </ul>
      </div>
    )
  }
}
