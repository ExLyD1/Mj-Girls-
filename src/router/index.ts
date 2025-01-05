import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MJ_Landing from '@/views/MyLanding.vue'
import MyProfile from '@/views/profile/MyProfile.vue'
import MyFavorite from '@/views/profile/MyFavorite.vue'
import ChangePassword from '@/views/profile/ChangePassword.vue'
import MyLogin from '@/views/auth/MyLogin.vue'
import SlutPage from '@/views/SlutPage.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Landing',
    component: MJ_Landing
  },
  {
    path: '/slutPage/:id',
    name: 'slutPage',
    component: SlutPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
