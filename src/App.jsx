import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Header from './components/Header'
import AddNotes from './components/AddNotes'
import {Route, Routes }from "react-router-dom"

function App() {

  return (
    <>
      <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='add_note/' element={<AddNotes/>}/>
      <Route path='edit/:id' element={<AddNotes/>}/>
      <Route path='delete/:id' element={<Home/>}/>
    </Routes>
    </>
  )
}

export default App
