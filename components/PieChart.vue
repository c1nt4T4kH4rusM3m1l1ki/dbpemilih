<template>
  <div style="height: 300px">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Pie } from 'vue-chartjs'
import { ref } from 'vue'

ChartJS.register(ArcElement, Tooltip, Legend)

const chartData = ref({
  labels: ['Direct', 'Organic Search', 'Social Media', 'Referral'],
  datasets: [
    {
      data: [30, 40, 20, 10],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1
    }
  ]
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false
})
</script>