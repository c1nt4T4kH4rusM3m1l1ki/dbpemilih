// middleware/auth.ts
import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated } = useAuth()
  const route = useRoute()

  if (!isAuthenticated.value && route.path !== '/login') {
    return navigateTo('/login')
  }
})
