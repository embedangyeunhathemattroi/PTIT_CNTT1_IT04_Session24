import React from 'react'
type PropTypes={
    id?:number;
    name?:string;
    price?:number;
    quantity?:number;
}

export default function B2({id=1,name="Coca cola",price=1000,quantity=10}:PropTypes) {
  return (
    <div>
    <h1>Thong Tin San Pham </h1>
    <p>id:{id}</p>
    <p>Name:{name}</p>
    <p>price:{price}$</p>
    <p>quantity:{quantity}</p>
    </div>
  )
}
