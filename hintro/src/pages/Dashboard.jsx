import React, { useState, useEffect } from 'react'
import LeftNavbar from '../components/LeftNavbar'
import TopNavbar from '../components/TopNavbar'
import MainPage from '../components/MainPage'
import FeedbackHistory from '../components/FeedbackHistory'
import FeedbackModal from '../components/FeedbackModal'
import { authStore } from '../store/authStore'

const LS_KEY = 'hintro_feedbacks'

function Dashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { fetchStats, fetchProfile, userId } = authStore()
  const [stats, setStats] = useState({ v1: '...', v2: '...', v3: '...', v4: '...' })
  const [userName, setUserName] = useState('there')
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)

  // Load feedbacks from localStorage on first render
  const [feedbacks, setFeedbacks] = useState(() => {
    try {
      const stored = localStorage.getItem(LS_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(feedbacks))
  }, [feedbacks])

  useEffect(() => {
    let isActive = true;

    const loadStats = async () => {
      try {
        const data = await fetchStats()
        if (!isActive) return;

        const formatDuration = (seconds) => {
          if (!seconds) return '0m 0sec';
          const m = Math.floor(seconds / 60);
          const s = Math.floor(seconds % 60);
          return `${m}m ${s}sec`;
        };

        const formatRelativeTime = (val) => {
          if (!val) return '-';
          const dateStr = Array.isArray(val) ? val[0] : String(val).substring(0, 24);
          const date = new Date(dateStr);
          if (isNaN(date.getTime())) return '-';
          const diffInDays = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
          if (diffInDays === 0) return 'Today';
          if (diffInDays === 1) return 'Yesterday';
          if (diffInDays < 0) return '-';
          return `${diffInDays} days ago`;
        };

        const profile = await fetchProfile()
        if (isActive && profile?.firstName) {
          setUserName(profile.firstName)
        }

        setStats({
          v1: data?.totalSessions || 0,
          v2: data?.averageDuration ? formatDuration(data.averageDuration) : '0m 0sec',
          v3: `${data?.totalAIInteractions ?? 0} times`,
          v4: (data?.lastSession?.length > 0) ? formatRelativeTime(data.lastSession[0]) : '-',
        })
      } catch (error) {
        if (isActive) console.error("Error fetching stats:", error)
      }
    }

    if (activeTab === 'Dashboard') {
      loadStats()
    }
    return () => { isActive = false; }
  }, [fetchStats, activeTab, userId])

  const handleFeedbackSubmit = (newFeedback) => {
    setFeedbacks((prev) => [newFeedback, ...prev])
  }

  return (
    <div className="min-h-screen flex">
      <LeftNavbar
        activeTab={activeTab}
        setActiveTab={(tab) => { setActiveTab(tab); setIsSidebarOpen(false); }}
        onOpenFeedbackModal={() => { setIsFeedbackModalOpen(true); setIsSidebarOpen(false); }}
        isSidebarOpen={isSidebarOpen}
        onCloseSidebar={() => setIsSidebarOpen(false)}
      />
      <div className='flex-1 flex flex-col h-screen overflow-hidden'>
        <TopNavbar activeTab={activeTab} onOpenSidebar={() => setIsSidebarOpen(true)} />
        {activeTab === 'Feedback History' ? (
          <FeedbackHistory
            feedbacks={feedbacks}
            onGiveFeedbackClick={() => setIsFeedbackModalOpen(true)}
          />
        ) : (
          <MainPage v1={stats.v1} v2={stats.v2} v3={stats.v3} v4={stats.v4} userName={userName} userId={userId} />
        )}
      </div>

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  )
}

export default Dashboard
