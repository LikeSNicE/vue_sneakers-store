<!-- <script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { base_url } from '@/services/api'
import { getUserIdFromToken } from '@/services/api'

const userData = ref({
  userName: '',
  email: '',
})

const userId = ref(null)

const fetchUser = async () => {
  userId.value = getUserIdFromToken()

  try {
    const { data } = await axios.get(`${base_url}/users/${userId.value}`)
    userData.value = data
  } catch (error) {
    console.error(error.message)
  }
}

const updateUserData = async () => {
  try {
    const { data } = await axios.put(`${base_url}/users/${userId.value}`, userData.value)
    console.log(`Обновленные данные пользователя: ${data}`)
  } catch (error) {
    console.error('Ошибка загрузки пользователя:', error.message)
  }
}

onMounted(fetchUser)
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div>
      <label class="block mb-2">Имя пользователя</label>
      <input v-model="userData.userName" type="text" class="border p-2 w-full" />
    </div>

    <div>
      <label class="block mb-2">Email пользователя</label>
      <input v-model="userData.email" type="email" class="border p-2 w-full" />
    </div>
  </div>

  <button
    @click="updateUserData"
    class="bg-lime-500 rounded-xl p-3 text-white font-semibold hover:bg-lime-600 transition active:bg-lime-700 disabled:bg-slate-400 cursor-pointer mt-4"
  >
    Cохранить данные
  </button>
</template> -->


<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { base_url, getUserIdFromToken } from '@/services/api'

const userData = ref({
  userName: '',
  email: '',
})

const userId = ref(null)

const fetchUser = async () => {
  const token = localStorage.getItem('token');
  userId.value = getUserIdFromToken(token);

  try {
    const { data } = await axios.get(`${base_url}/users/${userId.value}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    userData.value = data
  } catch (error) {
    console.error('Ошибка загрузки пользователя:', error.message)
  }
}

const updateUserData = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    console.error('Токен отсутствует!')
    return
  }

  try {
    const { data } = await axios.put(`${base_url}/users/${userId.value}`, userData.value, {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    console.log('Обновленные данные пользователя:', data)
  } catch (error) {
    console.error('Ошибка обновления данных:', error.message)
  }
}

onMounted(fetchUser)
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div>
      <label class="block mb-2">Имя пользователя</label>
      <input v-model="userData.userName" type="text" class="border p-2 w-full " />
    </div>

    <div>
      <label class="block mb-2">Email пользователя</label>
      <input v-model="userData.email" type="email" class="border p-2 w-full"/>
    </div>
  </div>

  <button
    @click="updateUserData"
    class="bg-lime-500 rounded-xl p-3 text-white font-semibold hover:bg-lime-600 transition active:bg-lime-700 disabled:bg-slate-400 cursor-pointer mt-4"
  >
    Cохранить данные
  </button>
</template>
