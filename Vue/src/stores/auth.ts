import { defineStore } from 'pinia'
import router from '@/router'
import { useLocalStorage } from '@vueuse/core' // Use LocalStorage for persistence
import axios from 'axios'

export const useAuthStore = defineStore('auth_store', () => {
  const token = useLocalStorage<string | null>('auth_token', null) // Store token instead of user
  const user = useLocalStorage<string | null>('user_data', null) // Store user info (if needed)

  const saveSession = (newToken: string, userData: object) => {
    token.value = newToken
    user.value = JSON.stringify(userData)

    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}` // Set default auth header
  }

  const removeSession = () => {
    token.value = null
    user.value = null
    delete axios.defaults.headers.common['Authorization']
    router.push('/auth/sign-in') // Redirect to login page
  }

  const isAuthenticated = () => token.value !== null

  return {
    token,
    user,
    saveSession,
    removeSession,
    isAuthenticated
  }
})
