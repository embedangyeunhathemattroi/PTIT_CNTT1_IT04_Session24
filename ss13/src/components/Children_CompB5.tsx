import React, { Component } from 'react'
type Product={
    id:number;
    name:string;
    price:string;
    quantity:number;
};

type Props={
    product:Product;
}
export default class Children_CompB5 extends Component<Props> {
  render() {
    const{id,name,price,quantity}=this.props.product;

    return (
      <div>Children_CompB5
        <p>id:{id}</p>
        <p>name:{name}</p>
        <p>pricce:{price}</p>
        <p>quantity:{quantity}</p>
      </div>
    )
  }
}
