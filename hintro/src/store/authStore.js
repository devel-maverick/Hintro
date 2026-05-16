import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axiosInstance from '../api/axios'

export const authStore = create(persist((set, get) => ({
      userId: 'u1',
      isLoggedIn: false,
      switchUser: (id) => set({ userId: id }),
      login: (id) => set({ isLoggedIn: true, userId: id }),
      logout: () => set({ isLoggedIn: false, userId: 'u1' }),
      fetchDashboard: async () => {
        const { userId } = get()
        const res = await axiosInstance.get('/api/auth/dashboard', {
          headers: { 'x-user-id': userId }
        })
        return res.data
      },

      fetchStats: async () => {
        const { userId } = get()
        const res = await axiosInstance.get('/api/call-sessions/stats', {
          headers: { 'x-user-id': userId }
        })
        return res.data
      },
      fetchProfile: async () => {
        const { userId } = get()
        const res = await axiosInstance.get('/api/auth/profile', {
          headers: { 'x-user-id': userId }
        })
        return res.data
      },
      fetchCalls: async (limit = 10) => {
        const { userId } = get()
        const res = await axiosInstance.get(`/api/call-sessions?limit=${limit}`, {
          headers: { 'x-user-id': userId }
        })
        return res.data
      }
    }),
    {
      name: 'auth-storage-persist',
    }
  )
)
