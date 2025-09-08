import React, { Component } from "react";
import Children_Comp from "./Children_Comp";

export default class Parent_Comp extends Component {
  state = {
    name: "Pham Ngoc Linh",
  };

  render() {
    return (
      <div>
        <h3>Họ và tên Parent_Comp: {this.state.name}</h3>
        {/* Truyền props xuống component con */}
        <Children_Comp name={this.state.name} />
      </div>
    );
  }
}
