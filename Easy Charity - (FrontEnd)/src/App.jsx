import 'bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import React from "react"
import { Outlet } from 'react-router-dom'
import { Nabvar } from './components/Navbar.jsx'
import './Style.css'

function App() {

  return (
    <>
      <Nabvar></Nabvar>
      <Outlet></Outlet>
    </>
  )
}

export default App
