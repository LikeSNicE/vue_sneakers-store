<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

import CardList from '../components/CardList.vue'
import { base_url } from '@/services/api'
import { useLoadingStore } from '@/stores/loadingStore'

const loadingStore = useLoadingStore()

const favorites = ref([])

onMounted(async () => {
  try {
    loadingStore.startLoading()
    const { data } = await axios.get(`${base_url}/favorites?_relations=items`)
    favorites.value = data.map((obj) => obj.item)
    console.log(favorites.value)
  } catch (error) {
    console.log(error.message)
  } finally {
    loadingStore.stopLoading()
  }
})
</script>

<template>
  <h1 class="text-2xl font-bold mb-4">Мои закладки</h1>
  <CardList :items="favorites" isFavorites />
</template>
