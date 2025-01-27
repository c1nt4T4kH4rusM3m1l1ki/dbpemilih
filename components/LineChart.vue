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
        <div class="stat-value text-primary text-3xl md:text-4xl">{{ votersByType.Keluarga || 0 }}</div>
      </div>
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-title">Pemilih umum</div>
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

    <!-- Tambahkan Tabel Rekapitulasi -->
    <RekapitulasiTables />
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
import RekapitulasiTables from './RekapitulasiTables.vue'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

// Gunakan endpoint khusus dashboard
const { data: voters } = await useFetch('/api/dashboard/voters')

// Hitung total data
const totalVoters = computed(() => voters.value?.length || 0)

// Hitung data berdasarkan jenis_pemilih
const votersByType = computed(() => {
  if (!voters.value) return { Keluarga: 0, umum: 0 }
  
  return voters.value.reduce((acc, voter) => {
    acc[voter.jenis_pemilih] = (acc[voter.jenis_pemilih] || 0) + 1
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

  // Sort dan ambil top 10 desa
  return Object.fromEntries(
    Object.entries(data)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
  )
})

// Data untuk Bar Chart
const barChartData = computed(() => ({
  labels: ['Keluarga', 'umum'],
  datasets: [
    {
      label: 'Jumlah Pemilih',
      data: [votersByType.value.Keluarga || 0, votersByType.value.umum || 0],
      backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)'],
      borderColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
      borderWidth: 1
    }
  ]
}))

// Data untuk Pie Chart
const pieChartData = computed(() => ({
  labels: ['Keluarga', 'umum'],
  datasets: [
    {
      data: [votersByType.value.Keluarga || 0, votersByType.value.umum || 0],
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
</script>