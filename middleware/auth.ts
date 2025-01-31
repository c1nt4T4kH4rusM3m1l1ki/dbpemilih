// middleware/auth.ts
import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, userRole } = useAuth()
  
  // Debugging
  console.log('Auth middleware:', {
    path: to.path,
    isAuthenticated: isAuthenticated.value,
    role: userRole.value
  })

  // Jika belum login dan bukan di halaman login, redirect ke login
  if (!isAuthenticated.value && to.path !== '/login') {
    return navigateTo('/login')
  }

  // Jika mencoba akses /dbpemilih tapi bukan admin
  if (to.path === '/dbpemilih' && userRole.value !== 'admin') {
    return navigateTo('/')
  }
})
