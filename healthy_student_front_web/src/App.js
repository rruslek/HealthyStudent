import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css';
import { Auth } from './pages/Auth'
import { Registration } from './pages/Registration'
import { Main } from './pages/Main'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/login" element={<Auth/>} />
      <Route path="/register" element={<Registration/>} />
    </Routes>
  )
}

export default App;