import React, { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const increment = () => setCount(prev => prev + 1)
  const decrement = () => setCount(prev => prev - 1)
  const reset = () => setCount(0)

  return (
    <div className="counter-app">
      <div className="counter-container">
        <h1 className="title">Counter App</h1>
        <div className="count-display">
          <span className={`count ${count > 0 ? 'positive' : count < 0 ? 'negative' : 'zero'}`}>
            {count}
          </span>
        </div>
        <div className="button-group">
          <button className="btn btn-decrement" onClick={decrement}>
            - Decrement
          </button>
          <button className="btn btn-reset" onClick={reset}>
            Reset
          </button>
          <button className="btn btn-increment" onClick={increment}>
            + Increment
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
