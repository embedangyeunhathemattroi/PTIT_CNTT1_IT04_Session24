import { Component } from 'react'
type User={
    fullName:string
}
export default class Demo extends Component <object, User> {
    /*lifeCycle:class components
    1: mount
    2:update
    3:unmount

    **form
    */
   constructor(props:{}){
    super(props);
    this.state={
        fullName:"Hong van"
    }
   }
   //lay API , render du lieu
   componentDidMount(): void {
    console.log("compinnent dissmount dc goi");    
   }
   changeName=()=>{
    this.setState({fullName:"Ngoc Linh"})
   }

   //tap trung chinh 3 phuong thuc owr giai doan 2:Update
   shouldComponentUpdate(nextProps: object, nextState: Readonly<User>, nextContext: any): boolean {
       console.log("ShouldComponetnUpdate dc goi")
       return true;
   }

   componentDidUpdate(prevProps: object, prevState: Readonly<User>, snapshot?: any): void {
       console.log("ComponentDidUpdate")
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
        <p>Ten sinh vien :{this.state.fullName}</p>
        <button onClick={this.changeName}>ChangeName</button>
        <hr />

      </div>
    )
  }
}
