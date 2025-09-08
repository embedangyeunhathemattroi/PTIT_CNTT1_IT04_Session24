import React, { useEffect, useState } from 'react'

export default function UseEffect() {
    //truong hop 1: useEffect(callback,dêpendencies)
const[count,setCount]=useState<number>(0);
const[title,setTitle]=useState<string>("")
   useEffect(()=>{
    console.log("callback dc goi");
    document.title=title;
    
   }) 

   //truong hop 2 dc sd de goi api lay du lieu
   const[time,settime]=useState<number>(0)
   useEffect(()=>{
    const timeId=setInterval(()=>{
        setTime((prev)=>prev+1);
        console.log("dc chay");
        
    },1000);
    return ()=>{
        clearInterval(timeId)
    }
   },[])

   //truong hop 3, chi dc goi lai khi count thay doi
    useEffect(()=>{
        
    console.log("callback dc goi truong hop thu 3")
   },[count,title])


   useEffect(()=>{
    //lang nghe SK resize
        const handleResize=()=>{
            console.log("resize")
        }
        window.addEventListener("resize",handleResize)
   return()=> window.removeEventListener("resize",handleResize)
    })


return (
    <div>
        {console.log("componrnt mounted")}
        <h1>Count:{count}</h1>
        <button onClick={()=>setCount(count+1)}>Count</button>
        <input type="text" onChange={(e)=>setTitle(e.target.value)} />
        <h1>DemoUseEffect</h1>
        <h2>time:{time}</h2>
    </div>
  )
}
