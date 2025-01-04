// server/api/logout.post.ts
// server/api/logout.post.ts
import { defineEventHandler, setCookie } from 'h3'

export default defineEventHandler((event) => {
  // Hapus cookie sesi dengan mengatur maxAge ke -1
  setCookie(event, 'isAuthenticated', 'false', { maxAge: -1, path: '/' })
  setCookie(event, 'user', '', { maxAge: -1, path: '/' })
  return { success: true }
})
