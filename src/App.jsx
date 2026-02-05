import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Project/Home'
import Products from './Project/Products'
import {Routes,Route} from "react-router-dom"

function App() {
  

  return (
    <>
                
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Products />} />
            </Routes>
        
    </>
  )
}

export default App
