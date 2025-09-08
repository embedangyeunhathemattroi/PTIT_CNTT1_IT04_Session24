import { Component } from 'react'
type Customer={
  productcode:number,
  productname:string,
  price:number,
  quantity:number
}

type InitialState={
  customer:Customer
}

export default class B5Them extends Component<{},InitialState> {
  constructor(props:{}){
        super(props);
        this.state={
            customer:{
                quantity:0,
                productcode:0,
                price:0,
                productname:"",
            
            }
        }
    }

     handleSumit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log("gia tri khi nhap",this.state.customer)
        //cap nhat clea lai
        this.setState({
            customer:{
                 quantity:0,
                productcode:0,
                price:0,
                productname:"",
            }
        })
       
    }
    handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        console.log("gia tri name",e.target.name);
        const{name,value}=e.target;
        this.setState({
            customer:{...this.state.customer,[name]:value} //gtri thuoc tinh name 

        })
        
    }
  render() {
    return (
      <div>
        <h1> <b>Them Moi San Pham</b> </h1>
        <form action="" onSubmit={this.handleSumit}>
          <label htmlFor="">Ma So Luong</label>
          <input type="text"  onChange={this.handleChange} name="productcode" value={this.state.customer.productcode}/>
           <label htmlFor="">Ten San Pham</label>
                    <input type="text"  onChange={this.handleChange} name="productname" value={this.state.customer.productname}  />
           <label htmlFor="">Gia</label>
                    <input type="text" />
           <label htmlFor="">So Luong</label>
                    <input type="text"   onChange={this.handleChange} name="quantity" value={this.state.customer.quantity}/>
           <input type="number" max={10} min={0} />
           <button>Dang Ky </button>
        </form>
      </div>
    )
  }
}
