import { useState } from 'react'
import './App.css'
import RegistrationForm from './components/RegistrationForm'
import Login from './components/Login.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login />
    </>
  )
}

export default App
