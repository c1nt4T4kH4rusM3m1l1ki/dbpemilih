<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <ChartCard title="Traffic Sources">
      <PieChart />
    </ChartCard>
    <ChartCard title="User Engagement">
      <LineChart />
    </ChartCard>
  </div>
</template>

<script setup>
import ChartCard from './ChartCard.vue'
import PieChart from './PieChart.vue'
import LineChart from './LineChart.vue'
</script>