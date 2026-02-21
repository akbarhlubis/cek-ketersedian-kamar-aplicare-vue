<template>
  <nav class="md:hidden sticky bottom-0 w-full bg-white border-t border-gray-200 z-50 bottom-nav-safe">
    <div class="flex">
      <RouterLink
        v-for="tab in tabs"
        :key="tab.to"
        :to="tab.to"
        class="flex-1 flex flex-col items-center py-3 gap-0.5 transition-colors active:scale-95"
        :class="isActive(tab.to) ? 'text-green-600' : 'text-gray-400 hover:text-gray-500'"
      >
        <i :class="[tab.icon, 'text-xl']" />
        <span class="text-[11px] font-medium">{{ tab.label }}</span>
      </RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const tabs = [
  { to: '/', label: 'Utama', icon: 'pi pi-home' },
  { to: '/search', label: 'Pencarian', icon: 'pi pi-search' },
  { to: '/about', label: 'Tentang', icon: 'pi pi-info-circle' },
]

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>
