import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Favorites from '@/pages/Favorites.vue'
import Auth from '@/pages/Auth.vue'
import Register from '@/pages/Register.vue'
import Profile from '@/pages/Profile.vue'
import ProfileOrders from '@/pages/ProfileOrders.vue'
import ProfileHome from '@/pages/ProfileHome.vue'
import ProfileSettings from '@/pages/ProfileSettings.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/favorites', name: 'Favorites', component: Favorites },
  { path: '/auth', name: 'Auth', component: Auth },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/profile',
    component: Profile,
    children: [
      { path: '', component: ProfileHome },
      { path: 'orders', name: 'ProfileOrders', component: ProfileOrders },
      { path: 'settings', name: 'Profile Settings', component: ProfileSettings },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
