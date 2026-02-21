import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface RsItem {
  no: string
  kdppk: string
  nmppk: string
  nmjlnppk: string
  vvip: number
  vip: number
  utama: number
  I: number
  II: number
  III: number
  ICU: number
  ICCU: number
  NICU: number
  PICU: number
  IGD: number
  UGD: number
  BERSALIN: number
  HCU: number
  ISOLASI: number
}

export interface RoomDetail {
  kdppk: string
  nama_kelas: string
  nama_ruang: string
  jumlah_kamar: number
  jumlah_kosong: number
  pria: number
  wanita: number
  last_narik: string
  last_update: string
}

export interface RsProfile {
  kdppk: string
  nmppk: string
  telpppk: string
  nmjlnppk: string
  lat: number
  lng: number
  tglhbspksppk: string
}

export interface RsDetail {
  profil: RsProfile
  detil: Record<string, number>
  vip: RoomDetail[]
  Khusus: RoomDetail[]
  satu: RoomDetail[]
  dua: RoomDetail[]
  tiga: RoomDetail[]
  sarana: { no: string; refsarana_nama: string }[]
  pelayanan: { no: string; nama: string }[]
}

export const useHospitalStore = defineStore('hospital', () => {
  const rsList = ref<RsItem[]>([])
  const totalItem = ref(0)
  const numberOfPages = ref(0)
  const selectedRs = ref<RsDetail | null>(null)
  const loading = ref(false)

  return {
    rsList,
    totalItem,
    numberOfPages,
    selectedRs,
    loading,
  }
})
