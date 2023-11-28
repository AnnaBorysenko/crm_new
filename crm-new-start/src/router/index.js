import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const homeRoute = {
  path: '/',
  name: 'home',
  component: HomeView
}
const registerRoute = {
  path: '/user',
  name: 'RegisterUserFrom',
  component: () => import('../components/RegisterUserForm.vue')
}

const productRoute = {
  path: '/product/:id',
  name: 'product',
  component: () => import('../views/ProductView.vue')
}

const authRoute = {
  path: '/auth',
  name: 'auth',
  component: () => import('../views/AuthView.vue')
}

const routes = [homeRoute, productRoute, authRoute, registerRoute]

export const navigationLinks = [homeRoute, authRoute]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active-link',
  routes: routes
})

export { routes, router }