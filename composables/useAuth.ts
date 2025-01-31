// composables/useAuth.ts
import { navigateTo } from 'nuxt/app'
import { computed } from 'vue'
import type { LoginResponse } from '~/types/auth'

export const useAuth = () => {
  const isAuthenticated = useState<boolean>('auth', () => false)
  const userRole = useState<string>('role', () => '')

  onMounted(() => {
    const savedAuth = localStorage.getItem('auth')
    const savedRole = localStorage.getItem('role')
    
    if (savedAuth) {
      isAuthenticated.value = JSON.parse(savedAuth)
      userRole.value = savedRole || ''
    } else {
      navigateTo('/login')
    }
  })

  const login = async (username: string, password: string) => {
    try {
      const adminResponse = await $fetch<LoginResponse>('/api/login/admin', {
        method: 'POST',
        body: { username, password }
      })

      if (adminResponse.success) {
        isAuthenticated.value = true
        userRole.value = 'admin'
        localStorage.setItem('auth', 'true')
        localStorage.setItem('role', 'admin')
        return navigateTo('/')
      }

      const userResponse = await $fetch<LoginResponse>('/api/login/user', {
        method: 'POST',
        body: { username, password }
      })

      if (userResponse.success) {
        isAuthenticated.value = true
        userRole.value = 'user'
        localStorage.setItem('auth', 'true')
        localStorage.setItem('role', 'user')
        return navigateTo('/')
      }

      throw new Error('Username atau password salah')
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = () => {
    isAuthenticated.value = false
    userRole.value = ''
    localStorage.removeItem('auth')
    localStorage.removeItem('role')
    return navigateTo('/login')
  }

  const isAdmin = computed(() => userRole.value === 'admin')

  return {
    isAuthenticated,
    userRole,
    login,
    logout,
    isAdmin
  }
}
