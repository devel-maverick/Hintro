import React from 'react'
import { MessageSquarePlus, Star } from 'lucide-react'

function FeedbackHistory({ feedbacks = [], onGiveFeedbackClick }) {
  const hasFeedbacks = feedbacks.length > 0

  const getStarCount = (ratingStr) => {
    const n = parseInt(ratingStr)
    return isNaN(n) ? 0 : n
  }

  const truncate = (text, max = 32) => {
    if (!text || text === '-') return '-'
    return text.length > max ? text.substring(0, max) + '...' : text
  }

  return (
    <div className='w-full h-full p-8 md:p-12 overflow-y-auto bg-[#FAFAFA]'>
      <div className='mb-10'>
        <p className='text-sm text-gray-500 font-medium'>Browse your previous feedback submissions</p>
      </div>

      <div className='w-full border border-gray-200 rounded-xl bg-white overflow-hidden'>
        <div className='grid grid-cols-[1.5fr_1fr_2.5fr_1.5fr_1fr] bg-gray-50/80 border-b border-gray-200 px-6 py-4'>
          <div className='text-xs font-semibold text-gray-400 uppercase tracking-wide'>Title</div>
          <div className='text-xs font-semibold text-gray-400 uppercase tracking-wide'>Rating</div>
          <div className='text-xs font-semibold text-gray-400 uppercase tracking-wide'>Description</div>
          <div className='text-xs font-semibold text-gray-400 uppercase tracking-wide'>Date</div>
          <div className='text-xs font-semibold text-gray-400 uppercase tracking-wide'>Time</div>
        </div>
        {hasFeedbacks ? (
          <div className='flex flex-col'>
            {feedbacks.map((item, index) => (
              <div
                key={item.id}
                className={`grid grid-cols-[1.5fr_1fr_2.5fr_1.5fr_1fr] px-6 py-4 items-center hover:bg-gray-50/50 transition-colors ${
                  index !== feedbacks.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className='text-sm font-medium text-gray-800'>{item.title}</div>

                <div className='flex items-center gap-0.5'>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={13}
                      className={
                        s <= getStarCount(item.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-gray-200 text-gray-200'
                      }
                    />
                  ))}
                </div>

                <div className='text-sm text-gray-600 pr-4'>{truncate(item.description)}</div>
                <div className='text-sm text-gray-500'>{item.date}</div>
                <div className='text-sm text-gray-500'>{item.time}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center py-24 gap-3'>
            <div className='w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-1'>
              <MessageSquarePlus size={22} className='text-gray-400' />
            </div>
            <h3 className='text-base font-bold text-black'>No feedbacks yet</h3>
            <p className='text-sm text-gray-400'>Share your experience to help us improve Hintro.</p>
            <button
              onClick={onGiveFeedbackClick}
              className='mt-1 px-5 py-2 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors'
            >
              Give Feedback
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FeedbackHistory
