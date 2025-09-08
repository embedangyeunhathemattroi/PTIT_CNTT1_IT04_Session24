import { Component } from 'react'
type User={
    fullName:string
}
export default class B4 extends Component <object, User> {
   constructor(props:{}){
    super(props);
    this.state={
        fullName:"Học code để đi làm"
    }
   }
   //lay API , render du lieu
   changeName=()=>{
    this.setState({fullName:"Học code sẽ thành công. Cố lên!!!"})
   }

   //tap trung chinh 3 phuong thuc owr giai doan 2:Update
   shouldComponentUpdate(nextProps: object, nextState: Readonly<User>, nextContext: any): boolean {
       console.log("ShouldComponetnUpdate dc goi")
       return true;
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
        <p>Slogan :{this.state.fullName}</p>
        <button onClick={this.changeName}>Change State</button>
        <hr />

      </div>
    )
  }
}
