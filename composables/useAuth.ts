// composables/useAuth.ts
import { useCookie } from '#app'
import { navigateTo } from 'nuxt/app'

interface User {
  name: string
}

interface LoginResponse {
  success: boolean
  message?: string
  user?: User
}

interface LogoutResponse {
  success: boolean
}

export const useAuth = () => {
  // Mendefinisikan cookie dengan tipe boolean dan default sebagai fungsi
  const isAuthenticatedCookie = useCookie<boolean>('isAuthenticated', {
    default: () => false,
  })

  // Mendefinisikan state dengan tipe boolean
  const isAuthenticated = useState<boolean>('auth', () => isAuthenticatedCookie.value)

  // Mendefinisikan cookie dengan tipe string dan default sebagai fungsi
  const userCookie = useCookie<string>('user', {
    default: () => '',
  })

  const user = useState<User | null>('user', () => {
    try {
      return userCookie.value ? JSON.parse(userCookie.value) : null
    } catch (e) {
      console.error('Error parsing user cookie:', e)
      return null
    }
  })

  const login = async (username: string, password: string) => {
    try {
      // Menentukan tipe generik untuk $fetch
      const response = await $fetch<LoginResponse>('/api/login', {
        method: 'POST',
        body: { username, password },
      })

      if (response.success) {
        isAuthenticated.value = true
        isAuthenticatedCookie.value = true

        if (response.user) {
          user.value = response.user
          userCookie.value = JSON.stringify(response.user)
        }

        navigateTo('/')
      } else {
        throw new Error(response.message || 'Login gagal')
      }
    } catch (error) {
      console.error('Login gagal:', error)
      // Tangani kesalahan (misalnya, tampilkan pesan ke pengguna)
    }
  }

  const logout = async () => {
    try {
      // Menentukan tipe generik untuk $fetch
      const response = await $fetch<LogoutResponse>('/api/logout', {
        method: 'POST',
      })

      if (response.success) {
        isAuthenticated.value = false
        isAuthenticatedCookie.value = false

        user.value = null
        userCookie.value = ''

        navigateTo('/login')
      }
    } catch (error) {
      console.error('Logout gagal:', error)
      // Tangani kesalahan
    }
  }

  return {
    isAuthenticated,
    user,
    login,
    logout,
  }
}
