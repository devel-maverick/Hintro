import React, { useState } from 'react'
import { X, Star } from 'lucide-react'

function FeedbackModal({ isOpen, onClose, onSubmit }) {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const isNegative = rating > 0 && rating <= 3
  const isPositive = rating >= 4
  const placeholder = isNegative
    ? 'What frustrated you or felt confusing?'
    : isPositive
    ? 'What did you like the most?'
    : 'Share your thoughts...'

  const handleSubmit = () => {
    if (rating === 0) return
    const now = new Date()
    const dateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase()

    const newFeedback = {
      id: Date.now(),
      title: isNegative ? 'Negative Feedback' : 'Positive Feedback',
      rating: `${rating}/5`,
      description: description.trim() || '-',
      date: dateStr,
      time: timeStr,
    }
    onSubmit(newFeedback)
    setSubmitted(true)
  }

  const handleClose = () => {
    setSubmitted(false)
    setRating(0)
    setHovered(0)
    setDescription('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/20"
        onClick={handleClose}
      />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[620px] min-h-[340px] md:min-h-[400px] flex flex-col mx-4 overflow-hidden animate-modal-in">

        {submitted ? (
          <div className="flex flex-col h-full flex-1">
            <div className="flex justify-end px-6 pt-5">
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center px-10 pb-12 gap-4 flex-1">
              <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                <Star size={36} className="fill-amber-400 text-amber-400" />
              </div>
              <h2 className="text-[20px] font-bold text-gray-900 text-center">
                Thank you for your feedback!!
              </h2>
              <p className="text-[13px] text-gray-400 text-center max-w-[300px] leading-relaxed">
                Our team reviews every suggestion to improve AI responses, workflows, and overall experience.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full flex-1">
            <div className="flex items-start justify-between px-6 md:px-10 pt-6 md:pt-10 pb-4">
              <div>
                <h2 className="text-[24px] font-medium text-gray-900 tracking-tight">Give Feedback</h2>
                <p className="text-[15px] text-gray-400 mt-1">Describe your experience using Hintro...</p>
              </div>
            </div>
            <div className="px-6 md:px-10 pb-6 flex flex-col gap-6 flex-1 justify-center">
              <div className="flex items-center justify-center gap-5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star
                      size={52}
                      className={`transition-colors duration-150 ${
                        star <= (hovered || rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-gray-200 text-gray-200'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {rating > 0 && (
                <div className="flex flex-col animate-fade-in mt-2">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={placeholder}
                    rows={4}
                    autoFocus
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[15px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-500 transition-all bg-white resize-none"
                  />
                </div>
              )}
            </div>
            <div className="flex items-center justify-between px-6 md:px-10 pb-6 md:pb-10 mt-auto">
              <button
                onClick={handleClose}
                className="flex items-center gap-2 px-5 py-2 border border-gray-500 rounded-md text-[14px] font-medium text-black hover:bg-gray-50 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={rating === 0}
                className={`px-6 py-2.5 rounded-md text-[14px] font-medium transition-all ${
                  rating === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-500 text-white hover:bg-gray-600 active:scale-95'
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-in {
          animation: modal-in 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.18s ease both;
        }
      `}</style>
    </div>
  )
}

export default FeedbackModal
