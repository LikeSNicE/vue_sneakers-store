<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { authState } from '@/services/auth'
import { fetchUser } from '@/services/api'
import ProfileAvatar from '../components/ProfileAvatar.vue'

const router = useRouter()
const userData = ref({})

onMounted(async () => {
  if (!authState.isAuthenticated) {
    router.push('/auth') // Перенаправляем на страницу авторизации
  }
  await fetchUser(userData)
})
</script>
<template>
  <div v-if="userData">
    <ProfileAvatar :src="userData.avatar || '../../public/profile/avatar.jpg'" :isEditing="false" />
    <h1 class="text-xl mt-4" v-if="userData">Привет, {{ userData.userName }}!</h1>
    <p class="mt-4">Рады видеть тебя снова! Проверь новинки, и любимые модели в твоём профиле.</p>
  </div>
  <p v-else>Загрузка...</p>
</template>
