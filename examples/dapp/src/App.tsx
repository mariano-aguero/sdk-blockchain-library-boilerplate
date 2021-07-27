import React from 'react'
import logo from './logo.svg'
import './App.css'
import { createUser, showUser, User } from 'sdk-library-boilerplate'

const App = () => {
  const user: User = createUser('Alice', 30)

  showUser(user)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {user.name} is {user.age} years old.
        </p>
      </header>
    </div>
  )
}

export default App
