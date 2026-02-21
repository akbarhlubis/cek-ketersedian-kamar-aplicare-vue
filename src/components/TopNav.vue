<template>
  <header class="hidden md:block sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
    <div class="content-container">
      <div class="flex items-center justify-between h-16">
        <!-- Logo & Brand -->
        <RouterLink to="/" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div class="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center">
            <i class="pi pi-building text-white text-lg" />
          </div>
          <div>
            <span class="text-base font-bold text-gray-900">Cek Kamar RS</span>
            <span class="text-xs text-gray-400 ml-2 hidden lg:inline">Aplicare BPJS Kesehatan</span>
          </div>
        </RouterLink>

        <!-- Navigation Links -->
        <nav class="flex items-center gap-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            :class="isActive(link.to)
              ? 'bg-green-50 text-green-700'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
          >
            <i :class="[link.icon, 'text-sm']" />
            {{ link.label }}
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const navLinks = [
  { to: '/', label: 'Utama', icon: 'pi pi-home' },
  { to: '/search', label: 'Pencarian', icon: 'pi pi-search' },
  { to: '/about', label: 'Tentang', icon: 'pi pi-info-circle' },
]

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>
