import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { layout: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

router.beforeEach(async (to, from) => {
  if (localStorage.getItem('login_status') !== 'true' && to.name !== 'login') {
    return { name: 'login' }
  }

  if (localStorage.getItem('login_status') === 'true' && to.name === 'login') {
    return { name: 'home' }
  }

  return true
})

export default router
