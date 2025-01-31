export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, userRole } = useAuth()

  // Debug log
  console.log('Admin middleware:', {
    isAuthenticated: isAuthenticated.value,
    role: userRole.value,
    path: to.path
  })

  // Jika bukan admin, redirect ke home
  if (!isAuthenticated.value || userRole.value !== 'admin') {
    console.log('Access denied: not admin')
    return navigateTo('/')
  }
}) 