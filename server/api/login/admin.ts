export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event)

  if (username === 'admin' && password === 'admin123') {
    return {
      success: true,
      role: 'admin'
    }
  }

  return {
    success: false,
    message: 'Invalid admin credentials'
  }
}) 