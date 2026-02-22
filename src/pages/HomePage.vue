<template>
  <div class="page-content">
    <!-- Header -->
    <div class="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 md:static md:bg-transparent md:border-0 md:backdrop-blur-none">
      <div class="content-container flex items-center justify-between py-3 md:py-6">
        <div>
          <p class="text-xs text-gray-400 font-medium md:text-sm">Selamat datang</p>
          <h1 class="text-base font-bold text-gray-900 md:text-2xl">Cek Ketersediaan Kamar</h1>
        </div>
        <!-- Wrapper Location and Dark Mode -->
        <div class="flex items-center gap-3">
          <!-- Location Button -->
          <button
            class="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium border border-green-200 active:scale-95 transition-transform md:px-4 md:py-2"
            @click="showLocationPicker = true"
          >
          <i class="pi pi-map-marker text-xs" />
          <span class="max-w-28 truncate md:max-w-none">{{ locationLabel }}</span>
          <i class="pi pi-chevron-down text-xs" />
          </button> 
          <!-- Toggle Dark Mode -->
           <button 
            class="text-green-700"
            @click="toggle"
            >
            <i v-if="isDark" class="pi pi-sun" />            
            <i v-else class="pi pi-moon" />
          </button>
        </div>
      </div>
    </div>

    <div class="content-container pt-4 pb-6 md:pt-2 md:pb-10 space-y-6 md:space-y-8">
      <!-- Nearby Hospitals -->
      <section>
        <div class="flex items-center justify-between mb-3 md:mb-4">
          <h2 class="text-sm font-bold text-gray-800 md:text-lg">Rumah Sakit Terdekat</h2>
          <button class="text-xs text-green-600 font-medium md:text-sm" @click="$router.push('/search')">
            Lihat semua
          </button>
        </div>

        <!-- Loading Skeleton -->
        <div v-if="loadingNearby" class="flex gap-3 overflow-x-auto scroll-hide pb-2 md:grid md:grid-cols-3 lg:grid-cols-4 md:overflow-visible">
          <div v-for="n in 4" :key="n" class="shrink-0 w-44 h-36 rounded-2xl bg-gray-100 animate-pulse md:w-full" />
        </div>

        <!-- Hospital Cards -->
        <div v-else-if="nearbyHospitals.length" class="flex gap-3 overflow-x-auto scroll-hide pb-2 md:grid md:grid-cols-3 lg:grid-cols-4 md:overflow-visible">
          <HospitalCard v-for="rs in nearbyHospitals" :key="rs.kdppk" :rs="rs" />
        </div>

        <!-- Empty -->
        <div v-else class="text-center py-8 text-gray-400 md:py-12">
          <i class="pi pi-building text-3xl mb-2 block md:text-4xl" />
          <p class="text-sm">Pilih lokasi untuk melihat RS terdekat</p>
        </div>

        <!-- Lainnya Button -->
        <button
          v-if="nearbyHospitals.length"
          class="w-full mt-3 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors md:w-auto md:px-8"
          @click="$router.push('/search')"
        >
          Lainnya
        </button>
      </section>

      <!-- Other Locations -->
      <section>
        <h2 class="text-sm font-bold text-gray-800 mb-3 md:text-lg md:mb-4">Tempat Lainnya</h2>
        <div v-if="loadingDati" class="flex gap-3 overflow-x-auto scroll-hide pb-2 md:grid md:grid-cols-4 lg:grid-cols-6 md:overflow-visible">
          <div v-for="n in 4" :key="n" class="shrink-0 w-36 h-28 rounded-2xl bg-gray-100 animate-pulse md:w-full" />
        </div>
        <div v-else class="flex gap-3 overflow-x-auto scroll-hide pb-2 md:grid md:grid-cols-4 lg:grid-cols-6 md:overflow-visible">
          <LocationCard
            v-for="dati in otherLocations"
            :key="dati.id"
            :name="formatDatiName(dati.name)"
            @select="selectOtherLocation(dati)"
          />
        </div>
      </section>

      <!-- Saved Hospitals -->
      <section v-if="savedRsList.length">
        <div class="flex items-center justify-between mb-3 md:mb-4">
          <h2 class="text-sm font-bold text-gray-800 md:text-lg">Tersimpan</h2>
          <span class="text-xs text-gray-400 md:text-sm">{{ savedRsList.length }} RS</span>
        </div>
        <div class="flex gap-3 overflow-x-auto scroll-hide pb-2 md:grid md:grid-cols-3 lg:grid-cols-4 md:overflow-visible">
          <div
            v-for="rs in savedRsList"
            :key="rs.kdppk"
            class="touch-card shrink-0 w-44 border border-gray-200 rounded-2xl p-3 cursor-pointer hover:border-green-400 hover:shadow-md transition-all bg-white active:scale-[0.97] md:w-full"
            @click="$router.push(`/rs/${rs.kdppk}`)"
          >
            <div class="flex items-start justify-between mb-2">
              <div class="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
                <i class="pi pi-building text-green-600" />
              </div>
              <i class="pi pi-bookmark-fill text-green-500 text-sm" />
            </div>
            <p class="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">{{ rs.nmppk }}</p>
          </div>
        </div>
      </section>
    </div>

    <!-- Location Picker Dialog -->
    <Teleport to="body">
      <div
        v-if="showLocationPicker"
        class="fixed inset-0 z-100 flex items-end md:items-center justify-center"
      >
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showLocationPicker = false" />
        <div class="relative bg-white w-full md:max-w-md md:rounded-2xl rounded-t-3xl p-5 max-h-[80%] flex flex-col animate-slide-up md:animate-none md:shadow-xl">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-gray-900">Pilih Lokasi</h3>
          <button class="text-gray-400 hover:text-gray-600" @click="showLocationPicker = false">
            <i class="pi pi-times" />
          </button>
        </div>

        <!-- Province Select -->
        <div class="mb-3">
          <label class="text-xs font-medium text-gray-500 mb-1.5 block">PROVINSI</label>
          <div v-if="loadingProvinsi" class="h-10 bg-gray-100 rounded-xl animate-pulse" />
          <select
            v-else
            v-model="pickerProvinsi"
            class="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-400"
            @change="onProvinsiChange"
          >
            <option value="">-- Pilih Provinsi --</option>
            <option v-for="p in provinsiList" :key="p.id" :value="p.id">{{ p.name }}</option>
          </select>
        </div>

        <!-- Kabupaten Select -->
        <div class="mb-4">
          <label class="text-xs font-medium text-gray-500 mb-1.5 block">KABUPATEN / KOTA</label>
          <div v-if="loadingKab" class="h-10 bg-gray-100 rounded-xl animate-pulse" />
          <select
            v-else
            v-model="pickerDati"
            class="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-400"
            :disabled="!pickerProvinsi"
          >
            <option value="">-- Pilih Kabupaten/Kota --</option>
            <option v-for="d in datiList" :key="d.id" :value="d.id">{{ d.name }}</option>
          </select>
        </div>

        <button
          class="w-full bg-green-600 text-white py-3 rounded-xl font-semibold text-sm disabled:opacity-50"
          :disabled="!pickerProvinsi || !pickerDati"
          @click="applyLocation"
        >
          Terapkan Lokasi
        </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLocationStore } from '../stores/locationStore'
import type { RsItem } from '../stores/hospitalStore'
import { getProvinsi, getDati2, getListRS } from '../composables/useAplicare'
import HospitalCard from '../components/HospitalCard.vue'
import LocationCard from '../components/LocationCard.vue'
import useTheme from '../composables/useTheme'

const {isDark, toggle} = useTheme()
const locationStore = useLocationStore()

const loadingNearby = ref(false)
const loadingDati = ref(false)
const loadingProvinsi = ref(false)
const loadingKab = ref(false)
const nearbyHospitals = ref<RsItem[]>([])
const otherLocations = ref<any[]>([])
const savedRsList = ref<RsItem[]>([])

const showLocationPicker = ref(false)
const provinsiList = ref<any[]>([])
const datiList = ref<any[]>([])
const pickerProvinsi = ref('')
const pickerDati = ref('')

const locationLabel = computed(() => {
  if (locationStore.selectedDati2) return locationStore.selectedDati2.name
  if (locationStore.selectedPropinsi) return locationStore.selectedPropinsi.name
  return 'Pilih Lokasi'
})

async function loadNearbyHospitals() {
  loadingNearby.value = true
  try {
    const kddati2 = locationStore.selectedDati2?.id
    const res = await getListRS(0, kddati2)
    const list = res.listrs || []
    nearbyHospitals.value = list.slice(0, 8)
  } catch (e) {
    nearbyHospitals.value = []
  } finally {
    loadingNearby.value = false
  }
}

async function loadOtherLocations() {
  if (!locationStore.selectedPropinsi) return
  loadingDati.value = true
  try {
    const all = await getDati2(locationStore.selectedPropinsi.id)
    const currentId = locationStore.selectedDati2?.id
    otherLocations.value = all.filter(d => d.id !== currentId).slice(0, 8)
  } catch {
    otherLocations.value = []
  } finally {
    loadingDati.value = false
  }
}

async function loadSavedHospitals() {
  if (!locationStore.savedHospitals.length) return
  // Load first page and filter by saved kdppk
  try {
    const res = await getListRS(0)
    const list: RsItem[] = res.listrs || []
    savedRsList.value = list.filter(rs => locationStore.savedHospitals.includes(rs.kdppk))
  } catch { /* silent */ }
}

async function onProvinsiChange() {
  pickerDati.value = ''
  datiList.value = []
  if (!pickerProvinsi.value) return
  loadingKab.value = true
  try {
    datiList.value = await getDati2(pickerProvinsi.value)
  } finally {
    loadingKab.value = false
  }
}

async function applyLocation() {
  const prov = provinsiList.value.find(p => p.id === pickerProvinsi.value)
  const dati = datiList.value.find(d => d.id === pickerDati.value)
  if (prov && dati) {
    locationStore.setLocation(prov, dati)
    showLocationPicker.value = false
    await Promise.all([loadNearbyHospitals(), loadOtherLocations()])
  }
}

function selectOtherLocation(dati: any) {
  if (locationStore.selectedPropinsi) {
    locationStore.setLocation(locationStore.selectedPropinsi, dati)
    loadNearbyHospitals()
    loadOtherLocations()
  }
}

function formatDatiName(name: string) {
  return name
    .replace('KAB. ', '')
    .replace('KOTA ', '')
    .split(' ')
    .map(w => w.charAt(0) + w.slice(1).toLowerCase())
    .join(' ')
}

onMounted(async () => {
  loadingProvinsi.value = true
  try {
    provinsiList.value = await getProvinsi()
  } finally {
    loadingProvinsi.value = false
  }
  await Promise.all([loadNearbyHospitals(), loadOtherLocations(), loadSavedHospitals()])
})
</script>
