<template>
  <div class="min-h-screen bg-base-100">
    <div class="container mx-auto px-4">
      <h1 class="text-2xl font-bold text-center my-6">Dashboard Pemilih</h1>
      <div class="grid gap-4">
        <LineChart ref="lineChartRef" />
      </div>
    </div>
  </div>
</template>

<script setup>
import LineChart from '~/components/LineChart.vue'
import { ref, onMounted } from 'vue'

definePageMeta({
  middleware: ['auth'],
  layout: 'default'
})

const lineChartRef = ref(null)

// Refresh data saat komponen dimount
onMounted(async () => {
  await refreshDashboard()
})

const refreshDashboard = async () => {
  try {
    await lineChartRef.value?.refreshData()
  } catch (error) {
    console.error('Error refreshing dashboard:', error)
  }
}

// Expose method ke komponen lain
defineExpose({
  refreshDashboard
})
</script>

<style scoped>
.container {
  min-width: 320px;
  max-width: 1280px;
  margin: 0 auto;
}
</style>

