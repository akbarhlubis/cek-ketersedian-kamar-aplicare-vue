import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Provinsi {
  id: string
  name: string
}

export interface Dati2 {
  id: string
  name: string
}

const SAVED_KEY = 'saved_hospitals'
const LOCATION_KEY = 'last_location'

export const useLocationStore = defineStore('location', () => {
  const savedHospitals = ref<string[]>(
    JSON.parse(localStorage.getItem(SAVED_KEY) || '[]')
  )
  const selectedPropinsi = ref<Provinsi | null>(
    JSON.parse(localStorage.getItem(LOCATION_KEY) || 'null')?.provinsi ?? null
  )
  const selectedDati2 = ref<Dati2 | null>(
    JSON.parse(localStorage.getItem(LOCATION_KEY) || 'null')?.dati2 ?? null
  )

  function saveHospital(kdppk: string) {
    if (!savedHospitals.value.includes(kdppk)) {
      savedHospitals.value.push(kdppk)
      persist()
    }
  }

  function removeHospital(kdppk: string) {
    savedHospitals.value = savedHospitals.value.filter(k => k !== kdppk)
    persist()
  }

  function isSaved(kdppk: string) {
    return savedHospitals.value.includes(kdppk)
  }

  function setLocation(provinsi: Provinsi, dati2: Dati2) {
    selectedPropinsi.value = provinsi
    selectedDati2.value = dati2
    localStorage.setItem(LOCATION_KEY, JSON.stringify({ provinsi, dati2 }))
  }

  function persist() {
    localStorage.setItem(SAVED_KEY, JSON.stringify(savedHospitals.value))
  }

  return {
    savedHospitals,
    selectedPropinsi,
    selectedDati2,
    saveHospital,
    removeHospital,
    isSaved,
    setLocation,
  }
})
