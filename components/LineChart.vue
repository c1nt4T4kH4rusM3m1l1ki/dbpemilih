<template>
  <div class="p-4">
    <!-- Statistik Total -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-title">Total Pemilih</div>
        <div class="stat-value text-3xl md:text-4xl">{{ totalVoters }}</div>
      </div>
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-title">Pemilih Keluarga</div>
        <div class="stat-value text-primary text-3xl md:text-4xl">{{ votersByType.keluarga || 0 }}</div>
      </div>
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-title">Pemilih Umum</div>
        <div class="stat-value text-secondary text-3xl md:text-4xl">{{ votersByType.umum || 0 }}</div>
      </div>
    </div>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 gap-6">
      <!-- Jenis Pemilih Charts -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-base-200 rounded-lg shadow p-4">
          <h3 class="text-lg font-semibold mb-4">Statistik Jenis Pemilih</h3>
          <div class="h-[300px]">
            <Bar :data="barChartData" :options="barChartOptions" />
          </div>
        </div>

        <div class="bg-base-200 rounded-lg shadow p-4">
          <h3 class="text-lg font-semibold mb-4">Distribusi Pemilih</h3>
          <div class="h-[300px]">
            <Pie :data="pieChartData" :options="pieChartOptions" />
          </div>
        </div>
      </div>

      <!-- Kecamatan & Desa Charts -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Kecamatan Chart -->
        <div class="bg-base-200 rounded-lg shadow p-4">
          <h3 class="text-lg font-semibold mb-4">Data per Kecamatan</h3>
          <div class="h-[400px]">
            <Bar :data="kecamatanChartData" :options="kecamatanChartOptions" />
          </div>
        </div>

        <!-- Desa Chart -->
        <div class="bg-base-200 rounded-lg shadow p-4">
          <h3 class="text-lg font-semibold mb-4">Top 10 Desa</h3>
          <div class="h-[400px]">
            <Bar :data="desaChartData" :options="desaChartOptions" />
          </div>
        </div>
      </div>
    </div>

   
  </div>
</template>

<script setup>
import { Bar, Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
} from 'chart.js'

import { ref, onMounted, onUnmounted, watchEffect, computed } from 'vue'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const { data: voters, refresh: refreshVoters } = useFetch('/api/dashboard/voters', {
  server: false,
  immediate: true
})

// Tambahkan watchEffect untuk memantau perubahan data
watchEffect(async () => {
  if (voters.value) {
    // Recalculate semua computed properties
    totalVoters.value
    votersByType.value
    votersByKecamatan.value
    votersByDesa.value
    barChartData.value
    pieChartData.value
    kecamatanChartData.value
    desaChartData.value
  }
})

// Tambahkan polling dengan interval lebih pendek
const polling = ref(null)

onMounted(() => {
  polling.value = setInterval(async () => {
    await refreshVoters()
  }, 5000) // Update setiap 5 detik
})

onUnmounted(() => {
  if (polling.value) {
    clearInterval(polling.value)
  }
})

// Hitung total data
const totalVoters = computed(() => {
  return voters.value?.length || 0
})

// Hitung data berdasarkan jenis_pemilih
const votersByType = computed(() => {
  if (!voters.value) return { keluarga: 0, umum: 0 }
  
  return voters.value.reduce((acc, voter) => {
    const type = voter.jenis_pemilih.toLowerCase()
    acc[type] = (acc[type] || 0) + 1
    return acc
  }, {})
})

// Hitung data berdasarkan kecamatan
const votersByKecamatan = computed(() => {
  if (!voters.value) return {}
  
  return voters.value.reduce((acc, voter) => {
    acc[voter.kecamatan] = (acc[voter.kecamatan] || 0) + 1
    return acc
  }, {})
})

// Hitung data berdasarkan desa
const votersByDesa = computed(() => {
  if (!voters.value) return {}
  
  const data = voters.value.reduce((acc, voter) => {
    acc[voter.desa] = (acc[voter.desa] || 0) + 1
    return acc
  }, {})

  return Object.fromEntries(
    Object.entries(data)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
  )
})

// Data untuk Bar Chart
const barChartData = computed(() => ({
  labels: ['Keluarga', 'Umum'],
  datasets: [
    {
      label: 'Jumlah Pemilih',
      data: [
        voters.value?.filter(v => v.jenis_pemilih.toLowerCase() === 'keluarga').length || 0,
        voters.value?.filter(v => v.jenis_pemilih.toLowerCase() === 'umum').length || 0
      ],
      backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)'],
      borderColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
      borderWidth: 1
    }
  ]
}))

// Data untuk Pie Chart
const pieChartData = computed(() => ({
  labels: ['Keluarga', 'Umum'],
  datasets: [
    {
      data: [
        voters.value?.filter(v => v.jenis_pemilih.toLowerCase() === 'keluarga').length || 0,
        voters.value?.filter(v => v.jenis_pemilih.toLowerCase() === 'umum').length || 0
      ],
      backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)'],
      borderColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
      borderWidth: 1
    }
  ]
}))

// Data untuk Kecamatan Chart
const kecamatanChartData = computed(() => ({
  labels: Object.keys(votersByKecamatan.value),
  datasets: [{
    label: 'Jumlah Pemilih',
    data: Object.values(votersByKecamatan.value),
    backgroundColor: 'rgba(75, 192, 192, 0.8)',
    borderColor: 'rgb(75, 192, 192)',
    borderWidth: 1
  }]
}))

// Data untuk Desa Chart
const desaChartData = computed(() => ({
  labels: Object.keys(votersByDesa.value),
  datasets: [{
    label: 'Jumlah Pemilih',
    data: Object.values(votersByDesa.value),
    backgroundColor: 'rgba(153, 102, 255, 0.8)',
    borderColor: 'rgb(153, 102, 255)',
    borderWidth: 1
  }]
}))

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Jumlah Pemilih per Kategori'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
}

const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
}

// Options untuk Kecamatan Chart
const kecamatanChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y', // Horizontal bar chart
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Jumlah Pemilih per Kecamatan'
    }
  },
  scales: {
    x: {
      beginAtZero: true
    }
  }
}

// Options untuk Desa Chart
const desaChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y', // Horizontal bar chart
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Top 10 Desa dengan Pemilih Terbanyak'
    }
  },
  scales: {
    x: {
      beginAtZero: true
    }
  }
}

// Update chart options untuk tema dark
const chartOptions = {
  plugins: {
    legend: {
      labels: {
        color: '#fff'
      }
    },
    title: {
      color: '#fff'
    }
  },
  scales: {
    x: {
      ticks: { color: '#fff' },
      grid: { color: 'rgba(255, 255, 255, 0.1)' }
    },
    y: {
      ticks: { color: '#fff' },
      grid: { color: 'rgba(255, 255, 255, 0.1)' }
    }
  }
}

// Tambahkan method refresh
const refreshData = async () => {
  await refreshVoters()
  // Refresh RekapitulasiTables jika perlu
  if (rekapTableRef.value) {
    await rekapTableRef.value.refreshData()
  }
}

// Expose method refresh
defineExpose({
  refreshData
})
</script>