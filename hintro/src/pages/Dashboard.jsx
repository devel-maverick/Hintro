import React, { useState } from 'react'
import LeftNavbar from '../components/LeftNavbar'
import TopNavbar from '../components/TopNavbar'
import MainPage from '../components/MainPage'
function Dashboard() {
  return (
    <div className="min-h-screen flex">
      <LeftNavbar />
      <div className='flex-1'>
        <TopNavbar />
        <MainPage />
      </div>
    </div>
  )
}
export default Dashboard
