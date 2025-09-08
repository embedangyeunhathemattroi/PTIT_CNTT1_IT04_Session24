import React,{useMemo} from 'react'

export default function B1() {
    const cartItems=[
        {id:1,name:"San Pham A",price:100000,quantity:2},
         {id:2,name:"San Pham B",price:200000,quantity:1},      
    ];
    const total=useMemo(()=>{
        return cartItems.reduce((sum,item)=>sum+item.price*item.quantity,0);
    },[cartItems]);
  return (
    <div>B1
        <h2>Gio hang</h2>
        <ul>{cartItems.map((item)=>(<li key={item.id}>{item.name}-gia:{item.price.toLocaleString()} -SL:{item.quantity}</li>))}
        </ul>
        <h3>tong cong :{total.toLocaleString()}VND</h3>
    </div>
  )
}

