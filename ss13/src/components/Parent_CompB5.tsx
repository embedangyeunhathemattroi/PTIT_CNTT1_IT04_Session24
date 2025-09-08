import React, { Component } from 'react'
import Children_CompB5 from './Children_CompB5'

export default class Parent_CompB5 extends Component {
    state={
        product:{
        id:1,
        name:"Buoi ba roi",
        price:"12.000đ",
        quantity:6,
    },
}
  render() {
    return (
      <div>Parent_CompB5
        <Children_CompB5 product={this.state.product}/>
      </div>
    )
  }
}
