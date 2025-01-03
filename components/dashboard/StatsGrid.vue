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
const stats = [
  {
    title: 'Total Users',
    value: '31K',
    trend: 22
  },
  {
    title: 'Revenue',
    value: '$4,200',
    trend: 14
  },
  {
    title: 'New Clients',
    value: '120',
    trend: -14
  },
  {
    title: 'Projects',
    value: '89',
    trend: 7
  }
]
</script>