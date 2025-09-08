
import React , {useRef,useState,useEffect}from 'react'
export default function B3() {
  const[value,setValue]=useState("");
  const renderCount=useRef(0);
  useEffect(()=>{
    renderCount.current+=1;
  })
  
  return (
    <div>B3
      <label>
        <input type="text" onChange={(e)=>setValue(e.target.value)} />
        <p>{renderCount.current} lan</p>
      </label>
    </div>
  )
}
