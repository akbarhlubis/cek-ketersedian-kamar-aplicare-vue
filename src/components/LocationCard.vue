<template>
  <div
    class="touch-card shrink-0 w-36 md:w-full border rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-green-400 transition-all active:scale-[0.97]"
    :style="cardStyle"
    @click="$emit('select')"
  >
    <div class="w-10 h-10 rounded-full flex items-center justify-center" :style="iconStyle">
      <i class="pi pi-map-marker" />
    </div>
    <p class="text-sm font-semibold text-center leading-tight">{{ name }}</p>
    <p v-if="count !== undefined" class="text-xs" style="opacity:0.85">{{ count }} RS</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  count?: number
}>()
defineEmits<{ select: [] }>()

import { computed } from 'vue'

const cardStyle = computed(() => ({
  background: 'var(--color-surface)',
  color: 'var(--color-on-surface)',
  borderColor: 'var(--color-border)'
}))

const iconStyle = computed(() => ({
  background: 'rgba(156, 163, 175, 0.12)'
}))
</script>
