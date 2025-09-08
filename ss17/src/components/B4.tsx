import React, { useState } from 'react'
import { HiH1 } from 'react-icons/hi2';

export default function B4() {
    const[isValue,setValue]=useState(true);
    const handleToggle=()=>{
        setValue(!isValue);
    }
  return (
    <div>B4
        <button onClick={handleToggle}>{isValue ?"an tieu de ":"hien tieu de"}</button>
        {isValue && <h1>Day la tieu de</h1>}
    </div>
  )
}
