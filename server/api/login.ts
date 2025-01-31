import { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const { username, password } = await readBody(event)
  console.log('Server received:', { username, password })

  if (username === 'admin' && password === 'admin123') {
    return {
      success: true,
      role: 'admin',
      message: 'Login berhasil'
    }
  }

  if (username === 'user' && password === 'user123') {
    return {
      success: true,
      role: 'user',
      message: 'Login berhasil'
    }
  }

  return {
    success: false,
    message: 'Username atau password salah'
  }
}) 