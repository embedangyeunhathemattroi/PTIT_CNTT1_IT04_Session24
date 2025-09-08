import React, { Component } from 'react'

type Task={
    id:number,
    task:string,
    completed:boolean

}
type InitialState={
    todo:Task[];
}
export default class Even extends Component {
    constructor(props:{}){
        super(props);
        this.state={
            todos:[{
                id:1,
                task:"hoc react",
                completed:false
            },
            {
                id:2,
                task:"hoc react",
                completed:false
            }
        ]
        }
    }
    //tao ham xoa CV
    deleteTask=(id:number)=>{
        console.log("id CV la id: ",id);
        let new_todos=this.state.todos.filter(item=>item.id!=id);
        this.setState({todos:new_todos})
        
    }
    handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        console.log("gia tri o input",e.target.value);
        
    }
    //ham them cong viec
    addTodo=()=>{
        
    }
  render() {
    return (
      <div>Even
        <h1>Danh sach CV can lam</h1>
        <ul>
            {this.state.todos.map((item:Task,index)=>{
                return<>
                <li>Ten CV:{item.name}</li>
                <button onClick={()=>this.deleteTask(item.id)}> Xoas</button>
                </>
            })}
        </ul>
       
      </div>
    )
  }
}
