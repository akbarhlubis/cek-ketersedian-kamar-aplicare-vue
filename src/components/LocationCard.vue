<template>
  <div
    class="touch-card flex-shrink-0 w-36 md:w-full border border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all active:scale-[0.97]"
    @click="$emit('select')"
  >
    <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
      <i class="pi pi-map-marker text-gray-500" />
    </div>
    <p class="text-sm font-semibold text-gray-700 text-center leading-tight">{{ name }}</p>
    <p v-if="count !== undefined" class="text-xs text-gray-400">{{ count }} RS</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  count?: number
}>()
defineEmits<{ select: [] }>()
</script>
