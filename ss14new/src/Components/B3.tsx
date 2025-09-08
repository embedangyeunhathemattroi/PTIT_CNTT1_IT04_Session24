import { Component } from 'react'
type User={
    fullName:string
}
export default class B3 extends Component <object, User> {
   constructor(props:{}){
    super(props);
    this.state={
        fullName:"RIKKEI ACADEMY"
    }
   }
   //lay API , render du lieu
   componentDidMount(): void {
    console.log("compinnent dissmount dc goi");    
   }
   changeName=()=>{
    this.setState({fullName:"RIKKEISOFT"})
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
      <div>Demo
        <p>COMPANY :{this.state.fullName}</p>
        <button onClick={this.changeName}>Change State</button>
        <hr />

      </div>
    )
  }
}
