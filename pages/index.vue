<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold text-center my-6">Dashboard Pemilih</h1>
    <LineChart />
  </div>
</template>

<script setup>
import LineChart from '~/components/LineChart.vue'

definePageMeta({
  middleware: ['auth']
})
</script>

