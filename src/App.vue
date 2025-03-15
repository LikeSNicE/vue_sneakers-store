<script setup>
import { ref, watch, provide, computed } from 'vue'
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'
import SpinnerLoader from './components/SpinnerLoader.vue'
import { useDrawerStore } from './stores/DrawerStore'

/* Корзина (START) */
const cart = ref([])

const drawerStore = useDrawerStore()

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 12) / 100))

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

provide('cart', {
  cart,
  addToCart,
  removeFromCart,
})
/* Корзина (END)*/

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true },
)
</script>

<template>
  <Drawer v-if="drawerStore.drawerOpen" :total-price="totalPrice" :vatPrice="vatPrice" />

  <div class="w-4/5 bg-white m-auto rounded-xl shadow-xl mt-14">
    <Header :total-price="totalPrice" @open-drawer="drawerStore.openDrawer()" />

    <div class="p-10">
      <SpinnerLoader />
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
