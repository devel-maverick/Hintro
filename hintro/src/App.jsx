import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { authStore } from './store/authStore'
function App() {
  const {isLoggedIn} = authStore();
  return (
    <div>
      <BrowserRouter>
          <Routes>
            {/* <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login/>}/> */}
            <Route path="/" element={<Dashboard/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App


// isLoggedIn ? <Dashboard/> : <Navigate to="/" 