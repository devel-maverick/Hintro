import React from "react"
import Step1Icon from "./icons/Step1Icon"
import Step2Icon from "./icons/Step2Icon"
import Step3Icon from "./icons/Step3Icon"
import Step4Icon from "./icons/Step4Icon"
import RecentCallsIcon from "./icons/RecentCallsIcon"

function MainPage({v1=0,v2=0,v3=0,v4=0}) {
  return (
    <>
    <div>
        <div className="flex flex-col ml-20 mt-6 mr-25">
            <div className='flex items-center justify-between gap-6'>
                <div className="flex flex-col gap-0">
                    <h1 className="text-[24px] font-semibold text-black">
                        Hi, Om 👋 Welcome to Hintro
                    </h1>
                    <p className="text-[15px] text-black/70 font-normal">
                        Ready to make your next call smarter ?
                    </p>
                </div>
                <div className="bg-black rounded-sm cursor-pointer px-3 py-1.5">
                    <button className="text-white font-medium">Start New Call</button>
                </div>
            </div>
            <div className="flex gap-4 mt-10 w-full">
                <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4 flex items-center min-h-[85px] gap-4 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                    <div className="w-[50px] h-[50px] bg-secondary rounded-[12px] flex items-center justify-center shrink-0">
                        <Step1Icon />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h3 className="text-[15px] font-medium text-black mb-0.5">Total Sessions</h3>
                        <p className="text-[20px] font-bold text-gray-900 leading-none">{v1}</p>    
                    </div>
                </div>
                <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4 flex items-center min-h-[85px] gap-4 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                    <div className="w-[50px] h-[50px] bg-tertiary rounded-[12px] flex items-center justify-center shrink-0">
                        <Step2Icon />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h3 className="text-[15px] font-medium text-black mb-0.5">Average Duration</h3>
                        <p className="text-[20px] font-bold text-gray-900 leading-none">{v2}</p>
                    </div>
                </div>
                <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4 flex items-center min-h-[85px] gap-4 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                    <div className="w-[50px] h-[50px] bg-fourth rounded-[12px] flex items-center justify-center shrink-0">
                        <Step3Icon />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h3 className="text-[15px] font-medium text-black mb-0.5">AI Used</h3>
                        <p className="text-[20px] font-bold text-gray-900 leading-none">{v3}</p>
                    </div>
                </div>
                <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4 flex items-center min-h-[85px] gap-4 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                    <div className="w-[50px] h-[50px] bg-fifth rounded-[12px] flex items-center justify-center shrink-0">
                        <Step4Icon />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h3 className="text-[15px] font-medium text-black mb-0.5">Last Session</h3>
                        <p className="text-[20px] font-bold text-gray-900 leading-none">{v4}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-10 w-full flex flex-col items-center">
            <h3 className="font-bold text-[15px] text-black mb-3">Recent calls</h3>
            <div className="bg-white border border-gray-200 rounded-[16px] flex flex-col items-center justify-center py-8 px-6 min-h-[180px] w-full max-w-[750px] mx-auto">
                <div className="mb-3">
                    <RecentCallsIcon />
                </div>
                <h3 className="font-bold text-[15px] text-black mb-1">No Recent Calls</h3>
                <p className="text-[13px] text-gray-500 text-center max-w-[420px] leading-relaxed mb-4">
                    Connect your Google Calendar to see upcoming meetings, get reminders, and join calls directly from Hintro.
                </p>
                <button className="px-4 py-1.5 border border-gray-200 rounded-md text-[13px] font-medium text-black hover:bg-gray-50 transition-colors bg-white shadow-sm">
                    Start a Call
                </button>
            </div>
        </div>
    </div>
    </>
  )
}
export default MainPage