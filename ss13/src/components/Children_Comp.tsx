import React, { Component } from "react";

type Props = {
  name: string;
};

export default class Children_Comp extends Component<Props> {
  render() {
    return (
      <div>
        <h3>Họ và tên Children_Comp: {this.props.name}</h3>
      </div>
    );
  }
}
