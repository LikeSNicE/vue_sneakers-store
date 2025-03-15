import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref([])

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

  watch(
    cart,
    () => {
      localStorage.setItem('cart', JSON.stringify(cart.value))
    },
    { deep: true },
  )

  return {
    cart,
    totalPrice,
    vatPrice,
    addToCart,
    removeFromCart,
  }
})
