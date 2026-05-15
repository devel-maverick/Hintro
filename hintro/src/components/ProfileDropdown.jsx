import React, { useState } from 'react'
import avatar from '../assets/avatar.png'
import { ChevronDown, LogOut } from 'lucide-react'

function ProfileDropdown({ user = 'USER2' }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='relative'>
      <div className='flex items-center gap-1 cursor-pointer' onClick={() => setIsOpen((prev) => !prev)}>
        <img src={avatar} alt="profile picture" className='w-9 h-9 rounded-full' />
        <button className='cursor-pointer'>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {isOpen && (
        <div className='absolute -right-7 top-12 bg-white rounded-lg shadow-lg border border-gray-200 p-2 w-[130px] z-50'>
          <button className='flex items-center justify-center w-full py-1 mb-1 rounded-lg hover:bg-gray-50 text-gray-800 cursor-pointer transition-colors' onClick={() => setIsOpen(false)}>
            <h2 className='text-base font-bold text-black/80'>{user}</h2>
          </button>
          <button
            className='flex items-center gap-3 w-full px-2 py-1.5 rounded-lg hover:bg-gray-50 text-gray-800 cursor-pointer transition-colors'
            onClick={() => setIsOpen(false)}
          >
            <LogOut className='w-4 h-4' />
            <h2 className='text-sm font-medium'>Log out</h2>
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfileDropdown
