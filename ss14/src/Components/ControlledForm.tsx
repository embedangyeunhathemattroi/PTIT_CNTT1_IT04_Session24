import React, { Component } from "react";

type StateTypes = {
  email?: string;
  userName?: string;
  address?: string;
};

export default class ControlledForm extends Component<object, StateTypes> {
  constructor(props: object) {
    super(props);
    // khai báo state
    this.state = {
      userName: "",
      email: "",
      address: "",
    };
  }

  render() {
    const handleSubmit=(event:React.FormEvent<>)=>{
        console.log("form submit")
    }
    return (
      <div>
        <h2>Controlled Form</h2>

     <form subMit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter UserName"
          value={this.state.userName}
          onChange={(e) => this.setState({ userName: e.target.value })}
        />
        <br />

        {/* Input Email */}
        <input
          type="text"
          placeholder="Enter Email"
          value={this.state.email}
          onChange={(e) => this.setState({ email: e.target.value })}
        />
        <br />

        {/* Input Address */}
        <input
          type="text"
          placeholder="Enter Address"
          value={this.state.address}
          onChange={(e) => this.setState({ address: e.target.value })}
        />
        <br />

        {/* Hiển thị dữ liệu state */}
        <h3>Preview:</h3>
        <p>UserName: {this.state.userName}</p>
        <p>Email: {this.state.email}</p>
        <p>Address: {this.state.address}</p>
      </div>
    );
  }
}
