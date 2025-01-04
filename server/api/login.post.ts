// server/api/login.post.ts
import { defineEventHandler, readBody, setCookie } from 'h3'

interface User {
  name: string
 
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  // Validasi kredensial (contoh sederhana)
  if (username === 'user' && password === '123') {
    // Set cookie sesi sebagai string 'true'
    setCookie(event, 'isAuthenticated', 'true', { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 }) // 1 hari

    const user: User = { name: 'User' }
    setCookie(event, 'user', JSON.stringify(user), { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 }) // 1 hari

    return { success: true, user }
  }

  return { success: false, message: 'Invalid credentials' }
})
