import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api } from '@/services/api'

interface User {
    id: number
    username: string
    email: string
    first_name: string
    last_name: string
}

interface AuthState {
    user: User | null
    accessToken: string | null
    refreshToken: string | null
    isAuthenticated: boolean
    login: (access: string, refresh: string) => void
    logout: () => void
    setUser: (user: User) => void
    checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,

            login: (access, refresh) => {
                localStorage.setItem('accessToken', access)
                localStorage.setItem('refreshToken', refresh)
                set({ accessToken: access, refreshToken: refresh, isAuthenticated: true })
            },

            logout: () => {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false })
            },

            setUser: (user) => set({ user }),

            checkAuth: async () => {
                const { accessToken, logout, setUser } = get()
                if (!accessToken) return

                try {
                    const response = await api.get('/auth/me/')
                    setUser(response.data)
                } catch (error) {
                    console.error("Auth Check Failed", error)
                    logout()
                }
            }
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ accessToken: state.accessToken, refreshToken: state.refreshToken }),
        }
    )
)
