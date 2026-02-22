<template>
  <div
    class="touch-card shrink-0 w-44 md:w-full border rounded-2xl p-3 cursor-pointer hover:border-green-400 hover:shadow-md transition-all active:scale-[0.97]"
    :style="cardStyle"
    @click="$router.push(`/rs/${rs.kdppk}`)"
  >
    <!-- Hospital icon -->
    <div class="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-2">
      <i class="pi pi-building text-green-600 text-lg" />
    </div>
    <!-- Name -->
    <p class="text-sm font-semibold leading-tight line-clamp-2 mb-2">{{ rs.nmppk }}</p>
    <!-- Room stats -->
    <div class="flex flex-wrap gap-1">
      <span v-if="rs.vip" :class="badgeClass(rs.vip)" class="text-[10px] px-1.5 py-0.5 rounded-full font-medium">
        VIP {{ rs.vip }}
      </span>
      <span v-if="rs.I" :class="badgeClass(rs.I)" class="text-[10px] px-1.5 py-0.5 rounded-full font-medium">
        I {{ rs.I }}
      </span>
      <span v-if="rs.II" :class="badgeClass(rs.II)" class="text-[10px] px-1.5 py-0.5 rounded-full font-medium">
        II {{ rs.II }}
      </span>
      <span v-if="rs.III" :class="badgeClass(rs.III)" class="text-[10px] px-1.5 py-0.5 rounded-full font-medium">
        III {{ rs.III }}
      </span>
      <span v-if="rs.ICU" :class="badgeClass(rs.ICU)" class="text-[10px] px-1.5 py-0.5 rounded-full font-medium">
        ICU {{ rs.ICU }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RsItem } from '../stores/hospitalStore'

defineProps<{ rs: RsItem }>()

import { computed } from 'vue'

const cardStyle = computed(() => ({
  background: 'var(--color-surface)',
  color: 'var(--color-on-surface)',
  borderColor: 'var(--color-border)'
}))

function badgeClass(count: number) {
  if (count === 0) return 'bg-red-50 text-red-500'
  if (count <= 2) return 'bg-orange-50 text-orange-500'
  return 'bg-green-50 text-green-600'
}

function shortAddress(addr: string) {
  if (!addr || addr === '0') return 'Alamat tidak tersedia'
  return addr.length > 25 ? addr.substring(0, 25) + '…' : addr
}
</script>
