<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TopNav from './components/TopNav.vue'
import BottomNav from './components/BottomNav.vue'

const route = useRoute()

const showBottomNav = computed(() => !route.path.startsWith('/rs/'))
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
    <!-- Desktop Top Navbar -->
    <TopNav />

    <!-- Main Content -->
    <main class="flex-1">
      <RouterView />
    </main>

    <!-- Mobile Bottom Nav (hidden on md+) -->
    <BottomNav v-if="showBottomNav" />

    <!-- Desktop Footer -->
    <footer class="hidden md:block border-t border-gray-200 bg-white mt-auto">
      <div class="content-container py-6">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center">
              <i class="pi pi-building text-white text-xs" />
            </div>
            <span class="text-sm font-semibold text-gray-700">Cek Kamar RS</span>
          </div>
          <p class="text-xs text-gray-400">
            Data dari Aplicare BPJS Kesehatan &middot; Dibuat dengan Vue 3 + PrimeVue
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
