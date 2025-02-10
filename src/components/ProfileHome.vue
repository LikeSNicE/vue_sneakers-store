<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { authState } from '@/services/auth'
import { base_url,getUserIdFromToken } from '@/services/api'

const router = useRouter()
const userInfo = ref(null)
const userId = ref(null)

// Проверяем авторизацию и получаем данные пользователя
onMounted(async () => {
  if (!authState.isAuthenticated) {
    router.push('/auth') // Перенаправляем на страницу авторизации
  } else {
    try {
      const token = localStorage.getItem('token');
      userId.value = getUserIdFromToken(token);
      const { data } = await axios.get(`${base_url}/users/${userId.value}`, {
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
  <h1 v-if="userInfo">Здравствуйте : {{ userInfo.userName }}</h1>
  <p v-else>Загрузка...</p>
</template>
