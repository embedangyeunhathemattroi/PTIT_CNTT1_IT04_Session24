import React, { Component } from 'react'
export default class Ex2 extends Component {
    state=({
    id:1,
    name:"Linh",
    job:"Hoc sinh",
    address:"Thanh Xuan,Ha Noi "

});
render(){
    return (
      <div>Ex2
       <h2>Thong tin ca nhan B2</h2>
       <p>Id:{this.state.id}</p>
       <p>Ten:{this.state.name}</p>
       <p>CV:{this.state.job}</p>
       <p>Id:{this.state.address}</p>
      </div>
    );
  }

}