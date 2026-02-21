<template>
  <div class="page-content">
    <!-- Header -->
    <div class="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 md:static md:bg-transparent md:border-0 md:backdrop-blur-none">
      <div class="content-container py-3 md:py-6">
        <h1 class="text-base font-bold text-gray-900 md:text-2xl">Tentang Aplikasi</h1>
      </div>
    </div>

    <div class="content-container pt-6 pb-6 md:pb-10 space-y-5 md:space-y-6">
      <!-- App Logo -->
      <div class="flex flex-col items-center py-6 md:py-8">
        <div class="w-20 h-20 bg-green-600 rounded-3xl flex items-center justify-center shadow-lg shadow-green-200 mb-4">
          <i class="pi pi-building text-white text-3xl" />
        </div>
        <h2 class="text-lg font-bold text-gray-900 text-center md:text-xl">Cek Kamar RS</h2>
        <p class="text-sm text-gray-400 mt-1">Versi 1.0.0</p>
        <div class="mt-3 px-4 py-1.5 bg-green-50 rounded-full">
          <p class="text-xs text-green-700 font-medium">Data dari Aplicare BPJS Kesehatan</p>
        </div>
      </div>

      <!-- Two-column on desktop -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
        <!-- Description -->
        <div class="bg-gray-50 rounded-2xl p-4 md:p-6">
          <h3 class="text-sm font-bold text-gray-800 mb-2 md:text-base">Tentang</h3>
          <p class="text-sm text-gray-600 leading-relaxed">
            Aplikasi ini membantu Anda melihat ketersediaan kamar rawat inap di Rumah Sakit yang bekerja sama dengan BPJS Kesehatan secara real-time.
          </p>
        </div>

        <!-- Features -->
        <div>
          <h3 class="text-sm font-bold text-gray-800 mb-3 md:text-base">Fitur Utama</h3>
          <div class="space-y-2.5">
            <div v-for="f in features" :key="f.title" class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" :class="f.bg">
                <i :class="[f.icon, f.color, 'text-sm']" />
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-800">{{ f.title }}</p>
                <p class="text-xs text-gray-500 mt-0.5">{{ f.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Source -->
        <div class="bg-blue-50 rounded-2xl p-4 md:p-6">
          <div class="flex items-center gap-2 mb-2">
            <i class="pi pi-database text-blue-600" />
            <h3 class="text-sm font-bold text-blue-800 md:text-base">Sumber Data</h3>
          </div>
          <p class="text-xs text-blue-700 leading-relaxed md:text-sm">
            Data ketersediaan kamar diambil langsung dari sistem <strong>Aplicare</strong> milik BPJS Kesehatan melalui endpoint resmi.
          </p>
          <p class="text-xs text-blue-500 mt-2 font-mono break-all">
            faskes.bpjs-kesehatan.go.id/aplicares
          </p>
        </div>

        <!-- Disclaimer -->
        <div class="bg-orange-50 rounded-2xl p-4 md:p-6">
          <div class="flex items-center gap-2 mb-2">
            <i class="pi pi-exclamation-triangle text-orange-500" />
            <h3 class="text-sm font-bold text-orange-800 md:text-base">Disclaimer</h3>
          </div>
          <p class="text-xs text-orange-700 leading-relaxed md:text-sm">
            Data ketersediaan kamar bersifat real-time dan dapat berubah sewaktu-waktu. Konfirmasi ketersediaan langsung ke rumah sakit yang bersangkutan sebelum datang.
          </p>
        </div>
      </div>

      <p class="text-center text-xs text-gray-300 pb-2 md:hidden">
        Dibuat dengan ❤ menggunakan Vue 3 + PrimeVue
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const features = [
  {
    title: 'Cek Kamar Real-time',
    desc: 'Lihat ketersediaan kamar RS secara langsung',
    icon: 'pi pi-refresh',
    bg: 'bg-green-50',
    color: 'text-green-600',
  },
  {
    title: 'Cari Berdasarkan Lokasi',
    desc: 'Saring RS berdasarkan provinsi & kabupaten',
    icon: 'pi pi-map-marker',
    bg: 'bg-blue-50',
    color: 'text-blue-600',
  },
  {
    title: 'Simpan Favorit',
    desc: 'Tandai RS favorit untuk akses cepat',
    icon: 'pi pi-bookmark',
    bg: 'bg-purple-50',
    color: 'text-purple-600',
  },
  {
    title: 'Detail Lengkap',
    desc: 'Info profil, ruangan, pelayanan & fasilitas RS',
    icon: 'pi pi-list',
    bg: 'bg-orange-50',
    color: 'text-orange-500',
  },
]
</script>
