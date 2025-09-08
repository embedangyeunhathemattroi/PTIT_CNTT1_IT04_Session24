import { useState } from 'react'
import './App.css'
import WarehouseManager from './components/Hack'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     < WarehouseManager></WarehouseManager>
    </>
  )
}

export default App
