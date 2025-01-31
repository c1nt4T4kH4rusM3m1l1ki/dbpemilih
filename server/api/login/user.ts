export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event)

  if (username === 'user' && password === 'user123') {
    return {
      success: true,
      role: 'user'
    }
  }

  return {
    success: false,
    message: 'Invalid user credentials'
  }
}) 