// middleware/guest.ts
import { useAuth } from '~/composables/useAuth'
import { navigateTo } from 'nuxt/app'

export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth()
  
  // Debugging
  console.log('Guest middleware:', {
    path: to.path,
    isAuthenticated: isAuthenticated.value
  })

  // Jika sudah login dan mencoba akses halaman login
  if (isAuthenticated.value && to.path === '/login') {
    return navigateTo('/')
  }
})
