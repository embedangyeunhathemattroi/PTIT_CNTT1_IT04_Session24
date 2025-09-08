import React from 'react'

export default function B5() {
  return (
   <div className="relative w-[500px] h-[200px] bg-cyan-300 border-[20px] border-cyan-200">
  <p>Relative parent</p>
  <div className="absolute bottom-0 left-0 bg-cyan-700 p-2 border-b-2">
    <p>Absolute child</p>
  </div>
</div>
  )
}
