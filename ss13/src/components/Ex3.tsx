import React, { Component } from 'react'

export default class Ex3 extends Component {
    state={
        users:[
            {id:1,name:"John",age:20},
            {id:2,name:"John",age:21},
            {id:3,name:"John",age:22}
        ]
    }
  render() {
    return (
      <div>Ex3
        <table border={1} cellPadding={10} style={{borderCollapse:"collapse"}}>
           <thead>
   <tr>
    <th>Id</th>
    <th>Name</th>
    <th>Age</th>
   </tr>
   </thead>
<tbody>
    {this.state.users.map((user)=>(
        <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.age}</td>


        </tr>
    ))}
</tbody>

        </table>
      </div>
    )
  }
}