
import React,{useEffect,useState} from 'react'
export default function B6() {
const[keyInfo,setKeyInfo]=useState({key:"",code:''})
useEffect(()=>{
  const handler=(e)=>{
    setKeyInfo({key:e.key,code:e.code})
  }
     window.addEventListener('keydown', handler);
return()=>{
     window.removeEventListener('keydown', handler);


}
})

  return (
    <div>B6
      <p>key:{keyInfo.key}</p>
      <p>code:{keyInfo.code}</p>
    </div>
  )
}
