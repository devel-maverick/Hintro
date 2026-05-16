import React, { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import DashboardIcon from '../components/icons/DashboardIcon'
import CallInsightsIcon from '../components/icons/CallInsightsIcon'
import KnowledgeBaseIcon from '../components/icons/KnowledgeBaseIcon'
import PromptsIcon from '../components/icons/PromptsIcon'
import BoxyControlsIcon from '../components/icons/BoxyControlsIcon'
import FeedbackIcon from '../components/icons/FeedbackIcon'

const navItems = [
  { icon: DashboardIcon, label: 'Dashboard', disabled: false },
  { icon: CallInsightsIcon, label: 'Call Insights', disabled: true, hasAlert: false },
  { icon: KnowledgeBaseIcon, label: 'Knowledge Base', disabled: true, hasAlert: true },
  { icon: PromptsIcon, label: 'Prompts', disabled: true, hasAlert: true },
  { icon: BoxyControlsIcon, label: 'Boxy Controls', disabled: true, hasAlert: true },
]

function LeftNavbar({ activeTab, setActiveTab, onOpenFeedbackModal }) {
  return (
    <div className='w-[260px] flex flex-col border-r border-gray-200 min-h-screen shrink-0'>
      <div className='flex items-center justify-center border-b border-gray-200 h-[65px] shrink-0 w-full shadow-sm z-10'>
        <h1 className='text-[22px] font-medium text-gray-900'>Hintro</h1>
      </div>
      <div className='flex flex-col flex-1'>
        <div className='w-full flex flex-col gap-1.5 py-5 px-4'>
          {navItems.map(({ icon: Icon, label, disabled, hasAlert }) => (
            <div
              key={label}
              onClick={disabled ? undefined : () => setActiveTab(label)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg ${disabled ? 'cursor-default text-gray-800' : 'cursor-pointer'} ${!disabled && activeTab === label
                  ? 'bg-primary/10 text-primary font-medium'
                  : !disabled ? 'hover:bg-gray-50 text-gray-800' : ''
                }`}
            >
              <div className='flex items-center gap-3'>
                <Icon className='w-5 h-5' />
                <span className='text-[15px] font-medium whitespace-nowrap'>{label}</span>
              </div>
              {hasAlert && (
                <div className="flex items-center">
                  <AlertCircle className='w-[18px] h-[18px] text-gray-400' />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className='mt-75 px-4 pb-15 border-t border-gray-200 pt-7'>
          <div className='flex flex-col gap-3'>
            <div
              onClick={() => setActiveTab('Feedback History')}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${activeTab === 'Feedback History'
                  ? 'bg-primary/12 text-primary'
                  : 'hover:bg-gray-50 text-gray-800'
                }`}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                <path fillRule="evenodd" clipRule="evenodd" d="M4.5651 4.63239C4.72649 4.1079 5.21107 3.75 5.75983 3.75H7.5C7.84518 3.75 8.125 3.47018 8.125 3.125C8.125 2.77982 7.84518 2.5 7.5 2.5H5.75983C4.66232 2.5 3.69314 3.21581 3.37038 4.26479L1.36055 10.7967C1.28726 11.0349 1.25 11.2827 1.25 11.5319V15C1.25 16.3807 2.36929 17.5 3.75 17.5H16.25C17.6307 17.5 18.75 16.3807 18.75 15V11.5319C18.75 11.2827 18.7127 11.0349 18.6394 10.7967L16.6296 4.26479C16.3069 3.21581 15.3377 2.5 14.2402 2.5H12.5C12.1548 2.5 11.875 2.77982 11.875 3.125C11.875 3.47018 12.1548 3.75 12.5 3.75H14.2402C14.7889 3.75 15.2735 4.1079 15.4349 4.63239L17.2788 10.625H14.9088C13.9619 10.625 13.0962 11.16 12.6727 12.007L12.4592 12.434C12.2475 12.8575 11.8147 13.125 11.3412 13.125H8.65881C8.18535 13.125 7.75252 12.8575 7.54078 12.434L7.32725 12.007C6.90377 11.16 6.03812 10.625 5.09119 10.625H2.72122L4.5651 4.63239Z" fill="currentColor" />
                <path fillRule="evenodd" clipRule="evenodd" d="M10 1.875C10.3452 1.875 10.625 2.15482 10.625 2.5V7.86612L12.0581 6.43306C12.3021 6.18898 12.6979 6.18898 12.9419 6.43306C13.186 6.67714 13.186 7.07286 12.9419 7.31694L10.4419 9.81694C10.1979 10.061 9.80214 10.061 9.55806 9.81694L7.05806 7.31694C6.81398 7.07286 6.81398 6.67714 7.05806 6.43306C7.30214 6.18898 7.69786 6.18898 7.94194 6.43306L9.375 7.86612V2.5C9.375 2.15482 9.65482 1.875 10 1.875Z" fill="currentColor" />
              </svg>
              <span className='text-sm whitespace-nowrap'>Feedback History</span>
            </div>
            <div
              onClick={onOpenFeedbackModal}
              className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 text-gray-800"
            >
              <FeedbackIcon className='w-5 h-5' />
              <span className='text-sm whitespace-nowrap'>Feedback</span>
            </div>
          </div>
          <button className='w-[180px] mx-7 mt-7 py-2 bg-black/50 hover:bg-gray-900 rounded-lg text-sm font-medium text-white transition-colors'>
            Upgrade
          </button>
        </div>
      </div>
    </div>
  )
}
export default LeftNavbar