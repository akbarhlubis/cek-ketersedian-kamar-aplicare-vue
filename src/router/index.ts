import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import SearchPage from '../pages/SearchPage.vue'
import AboutPage from '../pages/AboutPage.vue'
import HospitalDetailPage from '../pages/HospitalDetailPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/search', name: 'search', component: SearchPage },
    { path: '/about', name: 'about', component: AboutPage },
    { path: '/rs/:kdppk', name: 'hospital-detail', component: HospitalDetailPage },
  ],
})

export default router
