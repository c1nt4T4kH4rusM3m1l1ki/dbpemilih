// middleware/auth.ts
export default defineNuxtRouteMiddleware(() => {
    const { isAuthenticated } = useAuth()
    
    if (!isAuthenticated.value) {
      return navigateTo('/login')
    }
  })