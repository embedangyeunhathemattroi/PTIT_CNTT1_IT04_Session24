import { Component } from 'react'
type User={
    fullName:string
}
export default class Notificion extends Component <object, User> {
   constructor(props:{}){
    super(props);
    this.state={
        fullName:"Hello nhe!!"
    }
   }
   //lay API , render du lieu
   componentDidMount(): void {
    console.log("compinnent da duoc mount ");    
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
