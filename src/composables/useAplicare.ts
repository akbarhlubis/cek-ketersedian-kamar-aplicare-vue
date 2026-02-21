const BASE = '/aplicares'

export interface Provinsi {
  id: string
  name: string
}

export interface Dati2 {
  id: string
  name: string
}

export interface RsListResponse {
  totalItem: string
  numberOfPages: number
  listrs: any[]
}

// ── Simple in-memory cache ──
interface CacheEntry<T> {
  data: T
  expiry: number
}

const cache = new Map<string, CacheEntry<any>>()

function getCached<T>(key: string): T | null {
  const entry = cache.get(key)
  if (!entry) return null
  if (Date.now() > entry.expiry) {
    cache.delete(key)
    return null
  }
  return entry.data
}

function setCache<T>(key: string, data: T, ttlMs: number) {
  cache.set(key, { data, expiry: Date.now() + ttlMs })
}

const TTL_LONG = 6 * 60 * 60 * 1000   // 6 hours — provinsi/kabupaten rarely change
const TTL_SHORT = 5 * 60 * 1000        // 5 minutes — room availability

export async function getProvinsi(): Promise<Provinsi[]> {
  const key = 'provinsi'
  const cached = getCached<Provinsi[]>(key)
  if (cached) return cached

  const res = await fetch(`${BASE}/Referensi/propinsi`)
  if (!res.ok) throw new Error('Gagal mengambil data provinsi')
  const data = await res.json()
  setCache(key, data, TTL_LONG)
  return data
}

export async function getDati2(idPropinsi: string): Promise<Dati2[]> {
  const key = `dati2_${idPropinsi}`
  const cached = getCached<Dati2[]>(key)
  if (cached) return cached

  const res = await fetch(`${BASE}/Referensi/dati2/${idPropinsi}`)
  if (!res.ok) throw new Error('Gagal mengambil data kabupaten/kota')
  const data = await res.json()
  setCache(key, data, TTL_LONG)
  return data
}

export async function getListRS(page = 1, kddati2?: string): Promise<RsListResponse> {
  const key = `listrs_${page}_${kddati2 || 'all'}`
  const cached = getCached<RsListResponse>(key)
  if (cached) return cached

  const body: Record<string, any> = { page }
  if (kddati2) body.kddati2 = kddati2
  const res = await fetch(`${BASE}/Dashboard/getListRSPKS`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('Gagal mengambil daftar rumah sakit')
  const data = await res.json()
  setCache(key, data, TTL_SHORT)
  return data
}

export async function getDataRS(kdppk: string) {
  const key = `datars_${kdppk}`
  const cached = getCached(key)
  if (cached) return cached

  const res = await fetch(`${BASE}/Pencarian/getData`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kdppk, jnsppk: 'R' }),
  })
  if (!res.ok) throw new Error('Gagal mengambil data rumah sakit')
  const data = await res.json()
  setCache(key, data, TTL_SHORT)
  return data
}
