<script setup>
import { useRouter } from 'vue-router'
import { logout } from '@/services/auth'

const router = useRouter()

// метод для выхода из профиля
const handleLogout = () => {
  logout(router)
}
</script>

<template>
  <!-- Боковая панель -->
  <div class="profile-sidebar col-span-1 w-1/5">
    <div class="h-full flex flex-col border-r border-r-gray-200 gap-y-4">
      <router-link to="/profile/orders" class="cursor-pointer">
        <span class="text-base tracking-wide">Заказы</span>
      </router-link>

      <div
        @click="handleLogout"
        class="flex rounded-md focus:outline-none font-semibold text-gray-500 hover:text-primary-400 cursor-pointer text-red-400 hover:text-red-600"
      >
        <span class="text-base tracking-wide truncate capitalize hidden lg:block">Выйти</span>
      </div>
    </div>
  </div>
</template>
