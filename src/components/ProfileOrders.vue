<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import CardList from '@/components/CardList.vue'

const userOrders = ref([])

onMounted(async () => {
  const { data } = await axios.get(`https://647af5741cbcb2a0.mokky.dev/orders?_relations=items`)
  userOrders.value = data
})
</script>

<template>
  <div>
    <h3 class="text-xl">Ваши заказы :</h3>
    <div v-for="order in userOrders" :key="order.id">
      <h1 class="text-xl">ID заказа: {{ order.id }}</h1>
      <CardList :items="order.items" isFavorites />
    </div>
  </div>
</template>
