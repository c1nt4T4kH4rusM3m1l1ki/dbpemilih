// composables/useAuth.ts
export const useAuth = () => {
  const isAuthenticated = useState('auth', () => false)
  const user = useState('user', () => null)

  const logout = () => {
    isAuthenticated.value = false
    user.value = null
    navigateTo('/login')
  }

  return {
    isAuthenticated,
    user,
    logout
  }
}