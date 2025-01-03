<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <StatsCard 
      v-for="stat in stats"
      :key="stat.title"
      v-bind="stat"
    />
  </div>
</template>

<script setup>
import StatsCard from './StatsCard.vue'

const stats = [
  { title: 'Page Views', value: '125.3K', trend: 12 },
  { title: 'Bounce Rate', value: '42%', trend: -8 },
  { title: 'Average Session', value: '4m 23s', trend: 15 },
  { title: 'Conversion Rate', value: '3.42%', trend: 5 }
]
</script>