import React, { useState } from 'react'
import avatar from '../assets/avatar.png'
import { ChevronDown, LogOut } from 'lucide-react'
import { authStore } from '../store/authStore'

const LogoutModal = ({ canOpen, onClose, onConfirm }) => {
  if (!canOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/20">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-[90vw] max-w-[450px] min-h-[260px] p-6 flex flex-col mx-4">
        <h2 className="text-[20px] font-semibold text-black mb-1">Leaving already?</h2>
        <div className="w-full h-px bg-gray-200 mb-5"></div>
        <p className="text-sm text-black/80 font-medium leading-relaxed pr-4">
          You can log back in anytime to continue your meetings with Hintro.
        </p>

        <div className="flex items-center justify-between mt-auto">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-400 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-black/90 transition-colors"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  )
}

function ProfileDropdown({ isMobile = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { userId, switchUser, logout } = authStore()

  return (
    <>
      <div className='relative'>
        <div className='flex items-center gap-1 cursor-pointer' onClick={() => setIsOpen((prev) => !prev)}>
          <img src={avatar} alt="profile picture" className='w-9 h-9 rounded-full' />
          <button className='cursor-pointer'>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {isOpen && (
          <div className='absolute -right-7 top-12 bg-white rounded-lg shadow-lg border border-gray-200 p-2 w-[130px] z-50'>
            <button 
              className='flex items-center justify-center w-full py-1 mb-1 rounded-lg hover:bg-gray-50 text-gray-800 cursor-pointer transition-colors' 
              onClick={() => {
                switchUser(userId === 'u1' ? 'u2' : 'u1');
                setIsOpen(false);
              }}
            >
              <h2 className='text-base font-bold text-black/80'>Switch to {userId === 'u1' ? 'u2' : 'u1'}</h2>
            </button>
            <button
              className='flex items-center gap-3 w-full px-2 py-1.5 rounded-lg hover:bg-gray-50 text-gray-800 cursor-pointer transition-colors'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(false);
                setIsModalOpen(true);
              }}
            >
              <LogOut className='w-4 h-4' />
              <h2 className='text-sm font-medium'>Log out</h2>
            </button>
          </div>
        )}
      </div>
      <LogoutModal
        canOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          logout()
          setIsModalOpen(false)
        }}
      />
    </>
  )
}

export default ProfileDropdown
