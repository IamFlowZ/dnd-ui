import React, { useState } from 'react'

export default function About() {
    const [count, setCount] = useState(0)
    return (
      <>
        <h2>About</h2>
        <p> You clicked {count} times.</p>
        <button onClick={() => setCount(count + 1)}>
          Click me.
        </button>
      </>
    )
  }