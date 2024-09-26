import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './Components/Home'
import Student from './Components/Student'
import Navbar from './Components/Navbar'

const App = () => {
  return (
    <div>
      <div> <Navbar/> </div>
      <Student/>       
  </div> 
  )
}

export default App