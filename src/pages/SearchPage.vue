<template>
  <div class="page-content">
    <!-- Header -->
    <div class="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 md:static md:bg-transparent md:border-0 md:backdrop-blur-none">
      <div class="content-container py-3 md:py-6">
        <h1 class="text-base font-bold text-gray-900 md:text-2xl">Pencarian RS</h1>
        <p class="text-xs text-gray-400 md:text-sm">Temukan rumah sakit berdasarkan lokasi</p>
      </div>
    </div>

    <div class="content-container pt-4 pb-6 md:pt-2 md:pb-10 space-y-3 md:space-y-4">
      <!-- Filters Row - stacks on mobile, side-by-side on desktop -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        <!-- Province -->
        <div>
          <label class="text-xs font-semibold text-gray-500 mb-1.5 block">PROVINSI</label>
          <div v-if="loadingProvinsi" class="h-11 bg-gray-100 rounded-xl animate-pulse" />
          <select
            v-else
            v-model="selectedPropinsiId"
            class="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-400 bg-white"
            @change="onProvinsiChange"
          >
            <option value="">-- Pilih Provinsi --</option>
            <option v-for="p in provinsiList" :key="p.id" :value="p.id">{{ p.name }}</option>
          </select>
        </div>

        <!-- Kabupaten -->
        <div>
          <label class="text-xs font-semibold text-gray-500 mb-1.5 block">KABUPATEN / KOTA</label>
          <div v-if="loadingDati" class="h-11 bg-gray-100 rounded-xl animate-pulse" />
          <select
            v-else
            v-model="selectedDatiId"
            class="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-400 bg-white"
            :disabled="!selectedPropinsiId"
            @change="onDatiChange"
          >
            <option value="">-- Pilih Kabupaten/Kota --</option>
            <option v-for="d in datiList" :key="d.id" :value="d.id">{{ d.name }}</option>
          </select>
        </div>

        <!-- Search keyword filter -->
        <div>
          <label class="text-xs font-semibold text-gray-500 mb-1.5 block">NAMA RUMAH SAKIT</label>
          <div class="relative">
            <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              v-model="keyword"
              type="text"
              placeholder="Cari nama RS..."
              class="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-green-400"
            />
          </div>
        </div>
      </div>

      <!-- Results Count & Loading -->
      <div v-if="hasSearched" class="flex items-center justify-between pt-1">
        <p class="text-xs text-gray-500 md:text-sm">
          Menampilkan <span class="font-semibold text-gray-800">{{ filteredList.length }}</span> rumah sakit
          <span v-if="totalItem"> dari {{ totalItem }}</span>
        </p>
        <button
          v-if="currentPage < totalPages"
          class="text-xs text-green-600 font-medium md:text-sm"
          @click="loadMore"
        >
          Muat lebih
        </button>
      </div>

      <!-- Loading Skeletons -->
      <div v-if="loading" class="space-y-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:space-y-0">
        <div v-for="n in 6" :key="n" class="h-24 bg-gray-100 rounded-2xl animate-pulse" />
      </div>

      <!-- Empty State -->
      <div v-else-if="hasSearched && !filteredList.length" class="text-center py-12 text-gray-400 md:py-16">
        <i class="pi pi-building text-4xl mb-3 block" />
        <p class="text-sm font-medium">Tidak ada RS ditemukan</p>
        <p class="text-xs mt-1">Coba pilih lokasi lain</p>
      </div>

      <!-- RS List -->
      <div v-else class="space-y-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:space-y-0">
        <div
          v-for="rs in filteredList"
          :key="rs.kdppk"
          class="touch-card border border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-green-400 hover:shadow-sm transition-all active:scale-[0.99] bg-white"
          @click="$router.push(`/rs/${rs.kdppk}`)"
        >
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
              <i class="pi pi-building text-green-600" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-800 leading-tight">{{ rs.nmppk }}</p>
              <p v-if="rs.nmjlnppk && rs.nmjlnppk !== '0'" class="text-xs text-gray-400 mt-0.5 truncate">
                <i class="pi pi-map-marker text-[10px]" /> {{ rs.nmjlnppk }}
              </p>
            </div>
            <i class="pi pi-chevron-right text-gray-300 text-sm mt-1" />
          </div>
          <!-- Room badges -->
          <div class="flex flex-wrap gap-1.5 mt-3">
            <span v-for="(val, key) in roomTypes(rs)" :key="key"
              :class="badgeClass(val as number)"
              class="text-[10px] px-2 py-0.5 rounded-full font-medium"
            >
              {{ key }}: {{ val }}
            </span>
          </div>
        </div>
      </div>

      <!-- Intro State -->
      <div v-if="!hasSearched && !loading" class="text-center py-16 text-gray-300 md:py-24">
        <i class="pi pi-search text-5xl mb-4 block" />
        <p class="text-sm text-gray-400">Pilih provinsi dan kabupaten</p>
        <p class="text-xs text-gray-300 mt-1">untuk melihat daftar rumah sakit</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLocationStore } from '../stores/locationStore'
import { getProvinsi, getDati2, getListRS } from '../composables/useAplicare'
import type { RsItem } from '../stores/hospitalStore'

const locationStore = useLocationStore()

const provinsiList = ref<any[]>([])
const datiList = ref<any[]>([])
const rsList = ref<RsItem[]>([])
const keyword = ref('')
const selectedPropinsiId = ref(locationStore.selectedPropinsi?.id || '')
const selectedDatiId = ref(locationStore.selectedDati2?.id || '')
const loading = ref(false)
const loadingProvinsi = ref(false)
const loadingDati = ref(false)
const hasSearched = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)
const totalItem = ref(0)

const filteredList = computed(() => {
  if (!keyword.value) return rsList.value
  return rsList.value.filter(rs =>
    rs.nmppk.toLowerCase().includes(keyword.value.toLowerCase())
  )
})

function roomTypes(rs: RsItem) {
  const map: Record<string, number> = {}
  if (rs.vip) map['VIP'] = rs.vip
  if (rs.I) map['Kls I'] = rs.I
  if (rs.II) map['Kls II'] = rs.II
  if (rs.III) map['Kls III'] = rs.III
  if (rs.ICU) map['ICU'] = rs.ICU
  if (rs.ICCU) map['ICCU'] = rs.ICCU
  if (rs.NICU) map['NICU'] = rs.NICU
  if (rs.ISOLASI) map['Isolasi'] = rs.ISOLASI
  return map
}

function badgeClass(val: number) {
  if (val === 0) return 'bg-red-50 text-red-500'
  if (val <= 2) return 'bg-orange-50 text-orange-500'
  return 'bg-green-50 text-green-600'
}

async function onProvinsiChange() {
  selectedDatiId.value = ''
  datiList.value = []
  rsList.value = []
  hasSearched.value = false
  if (!selectedPropinsiId.value) return
  loadingDati.value = true
  try {
    datiList.value = await getDati2(selectedPropinsiId.value)
  } finally {
    loadingDati.value = false
  }
}

async function onDatiChange() {
  if (!selectedDatiId.value) return
  currentPage.value = 1
  rsList.value = []
  await fetchRS()
  // Update location store
  const prov = provinsiList.value.find(p => p.id === selectedPropinsiId.value)
  const dati = datiList.value.find(d => d.id === selectedDatiId.value)
  if (prov && dati) locationStore.setLocation(prov, dati)
}

async function fetchRS() {
  loading.value = true
  hasSearched.value = true
  try {
    const res = await getListRS(currentPage.value, selectedDatiId.value)
    let list: RsItem[] = res.listrs || []
    // Client-side filter by dati if API doesn't support server-side
    if (selectedDatiId.value) {
      list = list.filter(rs => rs.kdppk.startsWith(selectedDatiId.value))
    }
    if (currentPage.value === 1) rsList.value = list
    else rsList.value.push(...list)
    totalPages.value = res.numberOfPages || 1
    totalItem.value = parseInt(String(res.totalItem).replace('.', '')) || 0
  } catch {
    rsList.value = []
  } finally {
    loading.value = false
  }
}

async function loadMore() {
  currentPage.value++
  await fetchRS()
}

onMounted(async () => {
  loadingProvinsi.value = true
  try {
    provinsiList.value = await getProvinsi()
  } finally {
    loadingProvinsi.value = false
  }
  if (selectedPropinsiId.value) {
    loadingDati.value = true
    try {
      datiList.value = await getDati2(selectedPropinsiId.value)
    } finally {
      loadingDati.value = false
    }
  }
  if (selectedDatiId.value) await fetchRS()
})
</script>
