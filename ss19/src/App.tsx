import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import B1 from './components/B1'
import B3 from './components/B3'
import B4 from './components/B4'
import B5 from './components/B5'
import B6 from './components/B6'
import B7 from './components/B7'
import B8 from './components/B8'
import B9 from './components/B9'
import B10 from './components/B10'

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
        <B1></B1>
        <hr />
        <B3></B3>
        <hr />
        <B4></B4>
        <hr />
        <B5></B5>
        <hr />
        b6
        <B6></B6>
        <hr />
        <B7></B7>
        <B8></B8>
        <B9></B9>
        <B10></B10>
      </p>
    </>
  )
}

export default App
