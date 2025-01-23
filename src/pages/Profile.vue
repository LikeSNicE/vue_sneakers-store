<script setup>
import ProfileSiderbar from '@/components/ProfileSiderbar.vue'
</script>

<template>
  <div class="profile">
    <h1 class="text-2xl font-bold mb-8">Профиль пользователя</h1>
    <div class="profile-inner flex gap-6">
      <!-- Боковая панель -->
      <ProfileSiderbar />
      <div class="profile-info w-4/5">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
