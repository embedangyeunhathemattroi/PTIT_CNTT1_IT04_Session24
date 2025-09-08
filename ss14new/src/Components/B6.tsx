import  { Component } from 'react'

type User={
     gender:""
}
type InstialState={
    user:User
}
export default class B6  extends Component<{},InstialState> {
    constructor(props:{}){
        super(props);
        this.state={
            user:{
             gender:""
            }
        }
    }
    handleSumit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log("gia tri khi nhap",this.state.user)
        //cap nhat clea lai
        this.setState({
            user:{
                gender:""
               
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
      <div>Gioi Tinh:
        <form action="" onSubmit={this.handleSumit}>
             <label htmlFor="">Nu</label>
            <input type="radio" value={'Female'} onChange={this.handleChange} name="NU" />
            <br />
            <label htmlFor="">Nam</label>
            <input type="radio"  value={'male'} onChange={this.handleChange} name="nam" />
            <label htmlFor="">Khac</label>
            <input type="radio"  value={'other'} onChange={this.handleChange} name="nam" />
            <br />
           
            <button>Submit</button>
            <hr />
           
            
        </form>
      </div>
    )
  }
}
