import React from 'react'
import Display from './Display'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Updateusers from './Updateusers'
function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/display' element={<Display/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/updateusers/:id' element={<Updateusers/>}></Route>
    </Routes>
</Router>
  )
}

export default App