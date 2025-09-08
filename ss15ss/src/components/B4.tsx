import React, { Component } from 'react'
type RangleFormState={
  rangevalue:number;
  submit:number |null;

}
export default class B4 extends Component<{},RangleFormState> {
  constructor(props:{}){
    super(props);
    this.state={
        rangevalue:50,
  submit:null,
    }
  }

  handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    this.setState({rangevalue:Number(e.target.value)})
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({ submit:this.state.rangevalue });
  };

  render() {
       const { rangevalue,submit } = this.state;
    return (
      <div>B4
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="">
            <input type="range"  min={0} max={100}  value={rangevalue}  onChange={this.handleChange}/>
          </label>
          <p>Value:{rangevalue}</p>
          <button type="submit">Submit</button>
        </form>

        {submit !==  null && (
          <div> submit value:{submit}</div>
        )}
      </div>
    )
  }
}
