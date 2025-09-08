import React, { Component } from 'react'
type Time={
    time:Date ;
}

export default class B7 extends Component<{},Time> {
    TimeId:number |null =null;
    constructor (props:{}){
        super(props);
        this.state={
            time:new Date(),
        }
    }

   tick() {
    this.setState({
      time: new Date()
    });
  }

  componentDidMount(): void {
      this.TimeId=window.setInterval(()=>this.tick,1000)
  }

  componentWillUnmount(): void {
      if(this.TimeId!=null){
        clearInterval(this.TimeId)
      }
  }

   
  render() {
  const{time}=this.state;
  const formattime=time.toLocaleDateString()

    
    return (
      <div>
        <h2>Thoi gian hien tai la :{formattime}</h2>
      </div>
    )
  }
}
