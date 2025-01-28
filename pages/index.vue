<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold text-center my-6">Dashboard Pemilih</h1>
    <LineChart ref="lineChartRef" />
  </div>
</template>

<script setup>
import LineChart from '~/components/LineChart.vue'
import { ref } from 'vue'

definePageMeta({
  middleware: ['auth']
})

const lineChartRef = ref(null)

// Expose refresh method untuk komponen child
const refreshDashboard = async () => {
  await lineChartRef.value?.refreshData()
}

// Expose method ke komponen lain
defineExpose({
  refreshDashboard
})
</script>

