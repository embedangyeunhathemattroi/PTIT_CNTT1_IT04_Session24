import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Bai1 from './components/PTIT_CNTT4_IT04_SS12/Bai1'
import CalculationB2 from './components/PTIT_CNTT4_IT04_SS12/CalculationB2'
import UserInfoB3 from './components/PTIT_CNTT4_IT04_SS12/UserInfoB3'
import ColorBoxB4 from './components/PTIT_CNTT4_IT04_SS12/ColorBoxB4'
import FormatName from './components/PTIT_CNTT4_IT04_SS12/FormatNameB5'
import AdminIndexB6 from './components/PTIT_CNTT4_IT04_SS12/AdminIndexB6'
import UserLayout from './components/PTIT_CNTT4_IT04_SS12/UserLayoutB7'
import UserTable from './components/PTIT_CNTT4_IT04_SS12/UserTableB8'
import TodoListIndex from './components/PTIT_CNTT4_IT04_SS12/TodoListIndex'
import Control from './components/PTIT_CNTT4_IT04_SS12/Control'





function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>Bai1</p>
      <Bai1></Bai1>
         <br/>
      <p>Bai2</p>
      <CalculationB2></CalculationB2>
         <br/>
      <p>Bai3</p>
      <UserInfoB3></UserInfoB3>
         <br/>
      <p>Bai4</p>
      <ColorBoxB4></ColorBoxB4>
         <br/>
      <p>Bai 5</p>
      <FormatName></FormatName>
         <br/>
      <p>Bai6 </p>
      <br/>
      <AdminIndexB6></AdminIndexB6>
      <p>Bai7</p>
    <UserLayout></UserLayout>
    <p>Bai 8</p>
      <UserTable></UserTable>
        <p>Bai 9</p>
       <TodoListIndex></TodoListIndex>
       <p>Bai 10</p>
       <Control></Control>


   


    </>
  )
}

export default App
