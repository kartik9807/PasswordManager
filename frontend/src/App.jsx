import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Manager from './components/Manager.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

function App() {
  return (
    <>
      <Navbar/>
      <Manager/>
      {/* <div className="min-h-calc(100vh - 80px)"></div> */}
      <Footer/>
    </>
  )
}

export default App
