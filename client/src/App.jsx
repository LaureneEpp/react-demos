import { useState } from 'react'
import PostsList from "./features/posts/PostsList"

import './App.css'

function App() {


  return (
    <>
      <div className="app">
        <h1>React on Rails blog</h1>
        <p>Find this app</p>
        <PostsList/>
      </div>

    </>
  )
}

export default App
