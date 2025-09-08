import React from 'react'
type PropTypes={
    name?:string;
    age?:number;
}

export default function Demo({name="linh",age=20}:PropTypes) {
  return (
    <div>Demo
    <h1>Function Component</h1>
    <p>Name:${name}</p>
    <p>Age:${age}</p>
    </div>
  )
}
