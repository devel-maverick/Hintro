import React, { useState, useEffect } from "react"
import Step1Icon from "./icons/Step1Icon"
import Step2Icon from "./icons/Step2Icon"
import Step3Icon from "./icons/Step3Icon"
import Step4Icon from "./icons/Step4Icon"
import RecentCallsIcon from "./icons/RecentCallsIcon"
import { CallAvatarsIcon } from "./icons/CallAvatarsIcon"
import { authStore } from '../store/authStore'
import { format, differenceInCalendarDays } from 'date-fns'

function MainPage({v1,v2,v3,v4,userName, userId}) {
  const { fetchCalls } = authStore()
  const [recentCalls, setRecentCalls] = useState([])

  useEffect(() => {
    let isActive = true;
    const loadCalls = async () => {
      try {
        const data = await fetchCalls(10);
        if (isActive && data?.callSessions) {
          setRecentCalls(data.callSessions);
        }
      } catch (error) {
        console.error("Error fetching calls:", error);
      }
    };
    loadCalls();
    return () => { isActive = false; };
  }, [fetchCalls, userId]);

  const groupCallsByDate = (calls) =>
    calls.reduce((groups, call) => {
      const key = format(new Date(call.started_at), 'MMMM do');
      (groups[key] ||= []).push(call);
      return groups;
    }, {});

  const groupedCalls = groupCallsByDate(recentCalls);

  const formatTime = (time) => format(new Date(time), 'h:mm a').toLowerCase();

  const formatRelativeTime = (day) => {
    if (!day) return '-';
    const date = new Date(day);
    if (isNaN(date)) return '-';
    const days = differenceInCalendarDays(new Date(), date);
    if (days < 0) return '-';
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  const displayV4 = recentCalls.length > 0 ? formatRelativeTime(recentCalls[0].started_at) : v4;

  return (
    <div className="overflow-y-auto h-full pb-10">
        <div className="flex flex-col mx-4 md:ml-20 mt-6 md:mr-25">
            <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-6'>
                <div className="flex flex-col gap-0">
                    <h1 className="text-[18px] md:text-[24px] font-semibold text-black">
                        Hi, {userName || 'there'} 👋 Welcome to Hintro
                    </h1>
                    <p className="text-[15px] text-black/70 font-normal">
                        Ready to make your next call smarter ?
                    </p>
                </div>
                <div className="bg-black rounded-sm cursor-pointer px-3 py-1.5 self-start">
                    <button className="text-white font-medium text-sm md:text-base">Start New Call</button>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6 md:mt-10 w-full">
                <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4 flex items-center min-h-[70px] md:min-h-[85px] gap-3 md:gap-4 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                    <div className="w-10 h-10 md:w-[50px] md:h-[50px] bg-secondary rounded-[10px] md:rounded-[12px] flex items-center justify-center shrink-0">
                        <Step1Icon />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h3 className="text-[13px] md:text-[15px] font-medium text-black mb-0.5">Total Sessions</h3>
                        <p className="text-[16px] md:text-[20px] font-bold text-gray-900 leading-none">{v1}</p>    
                    </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4 flex items-center min-h-[70px] md:min-h-[85px] gap-3 md:gap-4 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                    <div className="w-10 h-10 md:w-[50px] md:h-[50px] bg-tertiary rounded-[10px] md:rounded-[12px] flex items-center justify-center shrink-0">
                        <Step2Icon />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h3 className="text-[13px] md:text-[15px] font-medium text-black mb-0.5">Average Duration</h3>
                        <p className="text-[16px] md:text-[20px] font-bold text-gray-900 leading-none">{v2}</p>
                    </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4 flex items-center min-h-[70px] md:min-h-[85px] gap-3 md:gap-4 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                    <div className="w-10 h-10 md:w-[50px] md:h-[50px] bg-fourth rounded-[10px] md:rounded-[12px] flex items-center justify-center shrink-0">
                        <Step3Icon />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h3 className="text-[13px] md:text-[15px] font-medium text-black mb-0.5">AI Used</h3>
                        <p className="text-[16px] md:text-[20px] font-bold text-gray-900 leading-none">{v3}</p>
                    </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4 flex items-center min-h-[70px] md:min-h-[85px] gap-3 md:gap-4 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                    <div className="w-10 h-10 md:w-[50px] md:h-[50px] bg-fifth rounded-[10px] md:rounded-[12px] flex items-center justify-center shrink-0">
                        <Step4Icon />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h3 className="text-[13px] md:text-[15px] font-medium text-black mb-0.5">Last Session</h3>
                        <p className="text-[16px] md:text-[20px] font-bold text-gray-900 leading-none">{displayV4}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-6 md:mt-10 w-full flex flex-col items-center px-4 md:px-0">
            <h3 className="font-bold text-[15px] text-black mb-3">Recent calls</h3>
            {recentCalls.length > 0 ? (
                <div className="w-full max-w-[750px] mx-auto flex flex-col gap-6 mb-10">
                    {Object.entries(groupedCalls).map(([dateLabel, calls]) => (
                        <div key={dateLabel} className="flex flex-col gap-3">
                            <p className="text-[13px] font-medium text-gray-400">{dateLabel}</p>
                            {calls.map((call, idx) => (
                                <div key={call._id || idx} className="flex items-center justify-between py-2">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-[#8A2BE2] flex items-center justify-center text-white text-lg font-medium">
                                            {call.client ? call.client.charAt(0).toUpperCase() : 'K'}
                                        </div>
                                        <div className="flex flex-col">
                                            <h4 className="text-[15px] font-medium text-gray-900">{call.description || 'Design Call'}</h4>
                                            <div className="flex mt-1">
                                                <CallAvatarsIcon />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className="text-[13px] font-medium text-gray-900">{formatTime(call.started_at)}</span>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white border border-gray-200 rounded-[16px] flex flex-col items-center justify-center py-8 px-4 md:px-6 min-h-[180px] w-full max-w-[750px] mx-auto">
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
            )}
        </div>
    </div>
  )
}
export default MainPage