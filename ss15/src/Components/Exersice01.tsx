import { Component } from 'react'
type User={
    fullName:string
}
export default class Exercise01 extends Component <object, User> {
    /*lifeCycle:class components
    1: mount
    2:update
    3:unmount

    **form
    */
   constructor(props:{}){
    super(props);
    this.state={
        fullName:"Ngoc Linh"
    }
   }

   //3:Unmount -cuoi cung
   componentWillUnmount(): void {
       //khi component bi remove khoi dom

   }
  render() {
    //console.log("component render lan dau");
    console.log("component re-render");
    
    
    return (
      <div>
        <p>Ten sinh vien :{this.state.fullName}</p>
        <hr />

      </div>
    )
  }
}
