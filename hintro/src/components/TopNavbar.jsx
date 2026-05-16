import React from 'react'
import PlayIcon from './icons/PlayIcon'
import ProfileDropdown from './ProfileDropdown'

function TopNavbar({ activeTab }) {
    return (
        <div className='flex items-center justify-between w-full h-[65px] shrink-0 border-b border-gray-200 shadow-sm z-10'>
            <div className='ml-7'>
                <h1 className='text-[24px] text-black/80 ml-3'>
                    {activeTab}
                </h1>
            </div>
            <div className='flex items-center gap-8 mr-7'>
                <div className='flex items-center justify-center gap-2.5 border border-gray-600 rounded-md px-4 py-1.5 cursor-pointer'>
                    <PlayIcon />
                    <h2 className='text-sm font-medium'>Watch Tutorial</h2>
                </div>
                <ProfileDropdown />
            </div>
        </div>
    )
}
export default TopNavbar