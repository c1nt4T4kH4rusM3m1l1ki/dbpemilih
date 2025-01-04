// middleware/guest.ts
import { useAuth } from '~/composables/useAuth'
import { navigateTo } from 'nuxt/app'

export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated.value) {
    // Jika pengguna sudah terautentikasi, arahkan ke halaman profil
    return navigateTo('/')
  }
})
