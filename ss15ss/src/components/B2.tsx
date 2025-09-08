import React, { Component } from 'react'
type ColorFormState={
    color:string;
    displayColor:string;
}
export default class B2 extends Component<{},ColorFormState> {
    constructor(props:{}){
        super(props)
        this.state={
            color:"",
            displayColor:""
        }
    }

    //ham xu ly khi input thay doi
    handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        this.setState({color:e.target.value})
    };
    //xu ly khi submit form
     handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault;
        this.setState({displayColor:this.state.color})
    };


  render() {
     const { color, displayColor } = this.state;
    return (
     <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter color code:
            <input
              type="text"
              value={color}
              onChange={this.handleChange}
              
            />
          </label>
          <button type="submit" >Submit</button>
        </form>

        {displayColor && (
          <div style={{ marginTop: 20 }}>
            <p>Color code: {displayColor}</p>
          </div>
        )}
      </div>
    );
  }
}
