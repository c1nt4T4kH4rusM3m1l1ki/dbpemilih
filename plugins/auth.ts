export default defineNuxtPlugin(() => {
  const { isAuthenticated, userRole } = useAuth()

  // Hanya jalankan di client-side
  if (process.client) {
    // Cek localStorage saat aplikasi dimuat
    const savedAuth = localStorage.getItem('auth')
    if (savedAuth) {
      try {
        const auth = JSON.parse(savedAuth)
        isAuthenticated.value = auth.isAuthenticated
        userRole.value = auth.role
      } catch (e) {
        console.error('Error parsing auth data:', e)
      }
    }

    // Watch perubahan state untuk disimpan ke localStorage
    watch([isAuthenticated, userRole], ([newAuth, newRole]) => {
      localStorage.setItem('auth', JSON.stringify({
        isAuthenticated: newAuth,
        role: newRole
      }))
    })
  }
}) 