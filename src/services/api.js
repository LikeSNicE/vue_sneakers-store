const base_url = 'https://647af5741cbcb2a0.mokky.dev'

//getToken
const getUserIdFromToken = (token) => {
  if (!token) {
    console.error('Токен отсутсвует')
    return null
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1])) // Декодируем токен
    return payload.id || null // Возвращаем правильное поле
  } catch (e) {
    console.error('Ошибка при декодировании токена:', e)
    return null
  }
}

export { base_url, getUserIdFromToken }
