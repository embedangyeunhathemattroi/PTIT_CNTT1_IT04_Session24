import React from 'react'

export default function CalculationB2() {
    const cộng=(a:number,b:number):number=>{
        return a+b;
    };

     const trừ=(a:number,b:number):number=>{
        return a-b;
    };

     const nhân=(a:number,b:number):number=>{
        return a*b;
    };
   

     const chia=(a:number,b:number):number=>{
        if (b==0) {
            return 0;
            
        }
        return a/b;
    };
    const num1=10;
    const num2=10;

  return (
    <div>
        <h1>Danh Sách Kết Quả</h1>
        <ul>
            {num1}+{num2}={cộng(num1,num2)};
        </ul>
        <ul>
              {num1}-{num2}={trừ(num1,num2)};
        </ul>
        <ul>
              {num1}*{num2}={nhân(num1,num2)};
        </ul>
        <ul>
              {num1}/{num2}={chia(num1,num2)};
        </ul>
    </div>
  )
}
