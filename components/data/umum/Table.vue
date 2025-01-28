<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

interface Voter {
  nik: string
  nama: string
  tps: string
  umur: number
  jenis_kelamin: string
  kecamatan: string
  desa: string
  jenis_pemilih: string
  created_at: string
}

// Tambah interface untuk locations
interface Location {
  kecamatan: string
  desa: string
}

// Definisi state
const voters = ref<Voter[]>([])
const locations = ref<Location[]>([]) // Tambah state untuk locations
const selectedKecamatan = ref('')
const selectedDesa = ref('')
const searchQuery = ref('')
const loading = ref(false)
const error = ref<string | null>(null)
const currentPage = ref(1)
const totalPages = ref(1)

// Computed untuk list kecamatan dari locations
const kecamatanList = computed(() => {
  return [...new Set(locations.value.map(loc => loc.kecamatan))].sort()
})

// Computed untuk filter desa dari locations
const filteredDesa = computed(() => {
  if (!selectedKecamatan.value) return []
  return [...new Set(
    locations.value
      .filter(loc => loc.kecamatan === selectedKecamatan.value)
      .map(loc => loc.desa)
  )].sort()
})

// Fetch voters dengan pagination
const fetchVoters = async () => {
  try {
    loading.value = true
    error.value = null

    const { data } = await useFetch('/api/votersUmum', {
      params: {
        page: currentPage.value,
        search: searchQuery.value,
        kecamatan: selectedKecamatan.value,
        desa: selectedDesa.value
      }
    })
    if (data.value) {
      voters.value = (data.value.data as unknown) as Voter[]
      totalPages.value = data.value.pagination.totalPages
      locations.value = (data.value.locations as unknown) as Location[] // Simpan data locations
    }
  } catch (err) {
    error.value = 'Gagal memuat data'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Handle perubahan filter
const handleKecamatanChange = () => {
  selectedDesa.value = ''
  currentPage.value = 1
  fetchVoters()
}

const handleDesaChange = () => {
  currentPage.value = 1
  fetchVoters()
}

const handleSearch = (value: string) => {
  searchQuery.value = value
  currentPage.value = 1 // Reset page saat search
  fetchVoters()
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchVoters()
}

onMounted(async () => {
  await fetchVoters()
})
</script>

<template>
  <div class="p-4">
    <!-- Filter Section -->
    <div class="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <input
        type="text"
        placeholder="Cari nama..."
        class="input input-bordered"
        @input="(e) => handleSearch((e.target as HTMLInputElement).value)"
      />

      <select
        class="select select-bordered"
        v-model="selectedKecamatan"
        @change="handleKecamatanChange"
      >
        <option value="">Semua Kecamatan</option>
        <option v-for="kec in kecamatanList" 
                :key="kec"
                :value="kec">
          {{ kec }}
        </option>
      </select>

      <select
        class="select select-bordered"
        v-model="selectedDesa"
        @change="handleDesaChange"
        :disabled="!selectedKecamatan"
      >
        <option value="">Semua Desa</option>
        <option v-for="desa in filteredDesa" 
                :key="desa"
                :value="desa">
          {{ desa }}
        </option>
      </select>
    </div>

    <!-- Error State -->
    <div v-if="error" class="alert alert-error mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ error }}</span>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <span class="loading loading-spinner loading-lg text-primary"></span>
      <p class="mt-2 text-sm text-gray-500">Memuat data...</p>
    </div>

    <!-- Data Table -->
    <div v-else>
      <div class="overflow-x-auto rounded-lg border">
        <table class="table table-zebra">
          <thead class="bg-base-200">
            <tr>
              <th>No</th>
              <th>NIK</th>
              <th>Nama</th>
              <th>TPS</th>
              <th>Umur</th>
              <th>Jenis Kelamin</th>
              <th>Kecamatan</th>
              <th>Desa</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(voter, index) in voters" :key="voter.nik">
              <td class="font-medium">
                {{ index + 1 }}
              </td>
              <td>{{ voter.nik }}</td>
              <td>{{ voter.nama }}</td>
              <td>{{ voter.tps }}</td>
              <td>{{ voter.umur }}</td>
              <td>{{ voter.jenis_kelamin }}</td>
              <td>{{ voter.kecamatan }}</td>
              <td>{{ voter.desa }}</td>
            </tr>
            <tr v-if="voters.length === 0">
              <td colspan="8" class="text-center py-4">
                <div class="text-gray-500">Tidak ada data yang ditemukan</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-4" v-if="totalPages > 1">
        <div class="btn-group">
          <button 
            class="btn" 
            :disabled="currentPage === 1"
            @click="handlePageChange(currentPage - 1)"
          >«</button>
          <button class="btn">Page {{ currentPage }} of {{ totalPages }}</button>
          <button 
            class="btn" 
            :disabled="currentPage === totalPages"
            @click="handlePageChange(currentPage + 1)"
          >»</button>
        </div>
      </div>
    </div>
  </div>
</template>