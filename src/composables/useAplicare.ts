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

export async function getProvinsi(): Promise<Provinsi[]> {
  const res = await fetch(`${BASE}/Referensi/propinsi`)
  if (!res.ok) throw new Error('Gagal mengambil data provinsi')
  return res.json()
}

export async function getDati2(idPropinsi: string): Promise<Dati2[]> {
  const res = await fetch(`${BASE}/Referensi/dati2/${idPropinsi}`)
  if (!res.ok) throw new Error('Gagal mengambil data kabupaten/kota')
  return res.json()
}

export async function getListRS(page = 1, kddati2?: string): Promise<RsListResponse> {
  const body: Record<string, any> = { page }
  if (kddati2) body.kddati2 = kddati2
  const res = await fetch(`${BASE}/Dashboard/getListRSPKS`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('Gagal mengambil daftar rumah sakit')
  return res.json()
}

export async function getDataRS(kdppk: string) {
  const res = await fetch(`${BASE}/Pencarian/getData`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kdppk, jnsppk: 'R' }),
  })
  if (!res.ok) throw new Error('Gagal mengambil data rumah sakit')
  return res.json()
}
