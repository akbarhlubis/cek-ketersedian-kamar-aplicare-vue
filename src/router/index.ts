import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/Home.vue'),
    meta: { title: 'Home' }
  },
  {
    path: '/pencarian',
    name: 'Pencarian',
    component: () => import('../components/Pencarian.vue'),
    meta: { title: 'Pencarian' }
  },
  {
    path: '/tentang',
    name: 'Tentang',
    component: () => import('../components/Tentang.vue'),
    meta: { title: 'Tentang' }
  },
  {
    path: '/posts/:id',
    name: 'PostDetail',
    component: () => import('../components/PostDetail.vue'),
    props: true,
    meta: { title: 'Detail Post' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
