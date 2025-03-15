<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { base_url, fetchUser } from '@/services/api'
import BaseButton from '../components/BaseButton.vue'
import ProfileAvatar from '../components/ProfileAvatar.vue'

const userData = ref({
  userName: '',
  email: '',
  avatar: '',
})

const isLoading = ref(false)

// Функция для обновления аватара при выборе нового файла
const updateAvatar = (newAvatar) => {
  userData.value.avatar = newAvatar
}

const updateUserData = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    console.error('Токен отсутствует!')
    return
  }

  isLoading.value = true

  try {
    const { data } = await axios.patch(`${base_url}/users/${userData.value.id}`, userData.value)
    console.log('Обновленные данные пользователя:', data)
  } catch (error) {
    console.error('Ошибка обновления данных:', error.message)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await fetchUser(userData)
})
</script>

<template>
  <div>
    <ProfileAvatar
      :src="userData.avatar"
      width="150px"
      height="150px"
      isEditing
      @update:src="updateAvatar"
    />
    <div class="grid grid-cols-2 gap-4 mt-8">
      <div>
        <label class="block mb-2">Имя</label>
        <input v-model="userData.userName" type="text" class="border p-2 w-full" />
      </div>

      <div>
        <label class="block mb-2">Email</label>
        <input v-model="userData.email" type="email" class="border p-2 w-full" required />
      </div>
    </div>

    <BaseButton
      @click="updateUserData"
      :disabled="isLoading"
      :isLoading="isLoading"
      margin="mt-4"
      label="Сохранить данные"
      padding="px-2"
    />
  </div>
</template>
