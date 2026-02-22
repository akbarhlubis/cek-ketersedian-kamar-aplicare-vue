<template>
  <div class="page-content">
    <!-- Back Header -->
    <div class="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 md:static md:bg-transparent md:border-0 md:backdrop-blur-none">
      <div class="content-container flex items-center gap-3 py-3 md:py-6">
        <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-90 transition-transform" @click="$router.back()">
          <i class="pi pi-arrow-left text-gray-700" />
        </button>
        <div class="flex-1 min-w-0">
          <h1 class="text-sm font-bold text-gray-900 truncate md:text-xl">{{ profil?.nmppk || 'Detail Rumah Sakit' }}</h1>
        </div>
        <button
          class="w-8 h-8 flex items-center justify-center rounded-full"
          :class="isSaved ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'"
          @click="toggleSave"
        >
          <i :class="isSaved ? 'pi pi-bookmark-fill' : 'pi pi-bookmark'" />
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="content-container pt-4 space-y-4">
      <div class="h-28 bg-gray-100 rounded-2xl animate-pulse" />
      <div class="h-20 bg-gray-100 rounded-2xl animate-pulse" />
      <div class="h-44 bg-gray-100 rounded-2xl animate-pulse" />
      <div class="h-36 bg-gray-100 rounded-2xl animate-pulse" />
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-16 px-4">
      <i class="pi pi-exclamation-triangle text-4xl text-red-400 mb-3 block" />
      <p class="text-sm font-medium text-gray-700">Gagal memuat data</p>
      <p class="text-xs text-gray-400 mt-1 mb-4">{{ error }}</p>
      <button class="bg-green-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium" @click="load">
        Coba Lagi
      </button>
    </div>

    <div v-else-if="data" class="content-container pt-4 pb-6 md:pb-10 space-y-4 md:space-y-6">
      <!-- Profile Card -->
      <div class="bg-linear-to-br from-green-600 to-green-700 rounded-2xl p-4 md:p-6 text-white">
        <div class="flex items-start gap-3">
          <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
            <i class="pi pi-building text-white text-xl" />
          </div>
          <div class="flex-1 min-w-0">
            <h2 class="font-bold text-lg leading-tight md:text-xl">{{ profil?.nmppk }}</h2>
            <p v-if="profil?.nmjlnppk" class="text-green-100 text-xs mt-1 leading-snug md:text-sm">
              <i class="pi pi-map-marker text-[10px]" /> {{ profil.nmjlnppk }}
            </p>
          </div>
        </div>
        <div class="flex flex-wrap gap-3 mt-3 pt-3 border-t border-white/20">
          <div v-if="profil?.telpppk" class="flex items-center gap-1.5 text-green-100 text-xs md:text-sm">
            <i class="pi pi-phone text-[10px]" /> {{ profil.telpppk }}
          </div>
          <div v-if="profil?.tglhbspksppk" class="flex items-center gap-1.5 text-green-100 text-xs md:text-sm">
            <i class="pi pi-calendar text-[10px]" /> PKS s.d. {{ profil.tglhbspksppk }}
          </div>
        </div>
      </div>

      <!-- Room Summary -->
      <div>
        <h3 class="text-sm font-bold text-gray-800 mb-3 md:text-base">Ringkasan Kamar</h3>
        <div class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3">
          <div
            v-for="(val, key) in summaryRooms"
            :key="key"
            class="rounded-xl p-2.5 text-center"
            :class="summaryBg(val as number)"
          >
            <p class="text-lg font-bold" :class="summaryColor(val as number)">{{ val }}</p>
            <p class="text-[10px] font-medium mt-0.5" :class="summaryColor(val as number)">{{ key }}</p>
          </div>
        </div>
      </div>

      <!-- Room Detail Tabs -->
      <div>
        <div class="flex gap-2 overflow-x-auto scroll-hide pb-1 mb-3">
          <button
            v-for="tab in roomTabs"
            :key="tab.key"
            class="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors md:px-4 md:py-2 md:text-sm"
            :class="activeTab === tab.key
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'"
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Room Cards -->
        <div v-if="activeRooms.length" class="space-y-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:space-y-0">
          <div
            v-for="room in activeRooms"
            :key="room.nama_ruang"
            class="border border-gray-100 rounded-2xl p-3 md:p-4 bg-gray-50"
          >
            <div class="flex items-start justify-between mb-2">
              <div>
                <p class="text-sm font-semibold text-gray-800">{{ room.nama_ruang }}</p>
                <p class="text-xs text-gray-400">{{ room.nama_kelas }}</p>
              </div>
              <div
                class="px-2.5 py-1 rounded-full text-xs font-bold"
                :class="room.jumlah_kosong > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'"
              >
                {{ room.jumlah_kosong }} kosong
              </div>
            </div>
            <div class="flex items-center gap-4 text-xs text-gray-500">
              <span><i class="pi pi-server text-[10px] mr-1" />Total: <b class="text-gray-700">{{ room.jumlah_kamar }}</b></span>
              <span><i class="pi pi-user text-[10px] mr-1" />Pria: <b class="text-gray-700">{{ room.pria }}</b></span>
              <span><i class="pi pi-user text-[10px] mr-1" />Wanita: <b class="text-gray-700">{{ room.wanita }}</b></span>
            </div>
            <!-- Availability bar -->
            <div class="mt-2 bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div
                class="h-full rounded-full transition-all"
                :class="room.jumlah_kosong > 0 ? 'bg-green-500' : 'bg-red-400'"
                :style="{ width: room.jumlah_kamar > 0 ? `${(room.jumlah_kosong / room.jumlah_kamar) * 100}%` : '0%' }"
              />
            </div>
            <p class="text-[10px] text-gray-400 mt-1.5">
              <i class="pi pi-clock text-[10px]" /> Update: {{ room.last_update }}
            </p>
          </div>
        </div>
        <div v-else class="text-center py-8 text-gray-400">
          <p class="text-sm">Tidak ada data ruangan</p>
        </div>
      </div>

      <!-- Pelayanan & Sarana - side by side on desktop -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <!-- Pelayanan -->
        <div v-if="data.pelayanan?.length">
          <h3 class="text-sm font-bold text-gray-800 mb-3 md:text-base">Pelayanan Medis</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="p in data.pelayanan"
              :key="p.no"
              class="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium"
            >
              {{ formatPelayanan(p.nama) }}
            </span>
          </div>
        </div>

        <!-- Sarana -->
        <div v-if="data.sarana?.length">
          <h3 class="text-sm font-bold text-gray-800 mb-3 md:text-base">Sarana & Fasilitas</h3>
          <div class="space-y-1.5">
            <div
              v-for="s in data.sarana"
              :key="s.no"
              class="flex items-center gap-2.5 text-sm text-gray-700"
            >
              <i class="pi pi-check-circle text-green-500 text-sm shrink-0" />
              {{ s.refsarana_nama }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLocationStore } from '../stores/locationStore'
import { getDataRS } from '../composables/useAplicare'
import type { RsDetail } from '../stores/hospitalStore'

const route = useRoute()
const locationStore = useLocationStore()

const kdppk = route.params.kdppk as string
const data = ref<RsDetail | null>(null)
const loading = ref(false)
const error = ref('')
const activeTab = ref('semua')

const isSaved = computed(() => locationStore.isSaved(kdppk))

const profil = computed(() => data.value?.profil)

const roomTabs = [
  { key: 'semua', label: 'Semua' },
  { key: 'vip', label: 'VIP' },
  { key: 'Khusus', label: 'Khusus (ICU/Isolasi)' },
  { key: 'satu', label: 'Kelas I' },
  { key: 'dua', label: 'Kelas II' },
  { key: 'tiga', label: 'Kelas III' },
]

const activeRooms = computed(() => {
  if (!data.value) return []
  if (activeTab.value === 'semua') {
    return [
      ...(data.value.vip || []),
      ...(data.value.Khusus || []),
      ...(data.value.satu || []),
      ...(data.value.dua || []),
      ...(data.value.tiga || []),
    ]
  }
  return (data.value as any)[activeTab.value] || []
})

const summaryRooms = computed(() => {
  const d = data.value?.detil
  if (!d) return {}
  const map: Record<string, number> = {}
  const keys = ['vvip', 'vip', 'utama', 'I', 'II', 'III', 'ICU', 'ICCU', 'NICU', 'PICU', 'ISOLASI', 'BERSALIN']
  const labels: Record<string, string> = {
    vvip: 'VVIP', vip: 'VIP', utama: 'Utama', I: 'Kls I', II: 'Kls II',
    III: 'Kls III', ICU: 'ICU', ICCU: 'ICCU', NICU: 'NICU', PICU: 'PICU',
    ISOLASI: 'Isolasi', BERSALIN: 'Bersalin'
  }
  for (const k of keys) {
    if (d[k]) map[labels[k]] = d[k]
  }
  return map
})

function summaryBg(val: number) {
  if (val === 0) return 'bg-red-50'
  if (val <= 2) return 'bg-orange-50'
  return 'bg-green-50'
}

function summaryColor(val: number) {
  if (val === 0) return 'text-red-500'
  if (val <= 2) return 'text-orange-500'
  return 'text-green-600'
}

function formatPelayanan(nama: string) {
  const parts = nama.split(' - ')
  return parts[parts.length - 1]
}

function toggleSave() {
  if (isSaved.value) locationStore.removeHospital(kdppk)
  else locationStore.saveHospital(kdppk)
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    data.value = await getDataRS(kdppk)
  } catch (e: any) {
    error.value = e?.message || 'Terjadi kesalahan'
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>
