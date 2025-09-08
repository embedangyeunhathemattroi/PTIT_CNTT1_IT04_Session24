import React from 'react'
type PropTypes={
    name?:string;
}
export default function B1({name="pham linh"}:PropTypes) {
  return (
    <div>B1
    <p>Ten cua ban la :{name}</p></div>
  )
}
