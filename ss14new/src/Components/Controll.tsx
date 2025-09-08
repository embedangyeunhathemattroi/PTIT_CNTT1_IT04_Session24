import  { Component } from 'react'
import B5Them from './B5Them'

type User={
     email:string,
        password:string
}
type InstialState={
    user:User
}
export default class Controll  extends Component<{},InstialState> {
    constructor(props:{}){
        super(props);
        this.state={
            user:{
                email:"",
                password:""
            }
        }
    }
    handleSumit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log("gia tri khi nhap",this.state.user)
        //cap nhat clea lai
        this.setState({
            user:{
                email:"",
                password:""
            }
        })
       
    }
    handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        console.log("gia tri name",e.target.name);
        const{name,value}=e.target;
        this.setState({
            user:{...this.state.user,[name]:value} //gtri thuoc tinh name 

        })
        
    }
  render() {
    return (
      <div>form ky thuat Controll
        <form action="" onSubmit={this.handleSumit}>
            <label htmlFor="">Email</label>
            <input type="text" onChange={this.handleChange} name="email" value={this.state.user.email} />
            <br />
            <label htmlFor="">Password</label>
            <input type="text" onChange={this.handleChange} name="password" value={this.state.user.password}/>
            <br />
            <button>Login</button>
            <hr />
           
            
        </form>
      </div>
    )
  }
}
