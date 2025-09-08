import React, { Component } from 'react'
import Ex1 from './components/Ex1'
import Ex3 from './components/Ex3'
import Ex2 from './components/Ex2'
import Parent_Comp from './components/Parent_Comp'
import Parent_CompB5 from './components/Parent_CompB5'
import ListPost from './components/ListPost'
import B7 from './components/B7'
import Exer8 from './components/Exer8'
import B9 from './components/B9'
import B10 from './components/B10'
export default class App extends Component {
  render() {
    return (
      <div>
        <p>DEMO</p>

        <Ex1 />
        <Ex2 />
        <Ex3 />

        <h1>Bài 4</h1>
        <Parent_Comp />

        <h1>Bài 5</h1>
        <Parent_CompB5 />

        <h1>Bài 6</h1>
        <ListPost />  

        <h1>Bài 7</h1>
        <B7 />

        <h1>Bài 8</h1>
        <Exer8></Exer8>
        <h1>Bai 9</h1>
        <B9></B9>
        <h1>Bai10</h1>
        <B10></B10>
        
      </div>
    )
  }
}