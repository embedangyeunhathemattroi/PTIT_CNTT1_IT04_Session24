import React, { useEffect, useState } from 'react'

export default function B7() {
const[count,setCount]=useState<number>(0);
const[title,setTitle]=useState<string>("")
   useEffect(()=>{
    console.log("callback dc goi");
    document.title=title;
    
   }) 
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

    useEffect(()=>{
        
    console.log("callback dc goi truong hop thu 3")
   },[count,title])


   useEffect(()=>{
        const handleResize=()=>{
            console.log("resize")
        }
        window.addEventListener("resize",handleResize)
   return()=> window.removeEventListener("resize",handleResize)
    })


return (
    <div>
        <h1>Count:{count}</h1>
        <button onClick={()=>setCount(count+1)}>Count</button>
        <input type="text" onChange={(e)=>setTitle(e.target.value)} />
        <h1>DemoUseEffect</h1>
        <h2>time:{time}</h2>
    </div>
  )
}