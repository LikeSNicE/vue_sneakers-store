<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { authState } from '@/services/auth'

const router = useRouter()
const userInfo = ref(null)
const userId = ref(null)

// Функция для извлечения userId из токена
const getUserIdFromToken = (token) => {
  if (!token) {
    throw new Error('Токен отсутствует')
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1])) // Декодируем токен
    return payload.id // Возвращаем правильное поле
  } catch (e) {
    console.error('Ошибка при декодировании токена:', e)
    throw new Error('Ошибка декодирования токена')
  }
}

// Проверяем авторизацию и получаем данные пользователя
onMounted(async () => {
  if (!authState.isAuthenticated) {
    router.push('/auth') // Перенаправляем на страницу авторизации
  } else {
    try {
      const token = localStorage.getItem('token')
      userId.value = getUserIdFromToken(token) // Извлекаем userId из токена
      const { data } = await axios.get(`https://647af5741cbcb2a0.mokky.dev/users/${userId.value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      userInfo.value = data
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error)
    }
  }
})
</script>
<template>
  <h1>Здравствуйте : {{ userInfo.email }}</h1>
</template>
