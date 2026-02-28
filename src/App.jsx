import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Project/Home'
import Products from './Project/Products'
import {Routes,Route} from "react-router-dom"
import SignUp from './Project/SignUp'
import Login from './Project/Login'
import Users from './Project/Users'

function App() {
  

  return (
    <>
                
            <Routes>
              <Route path="/" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Products />} />
               <Route path="/users" element={<Users />} />

            </Routes>
        
    </>
  )
}

export default App
