<template>
  <div>
    <div class="mb-1">
      <div class="form-control">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Cari berdasarkan nama..."
          class="input input-bordered input-sm w-full max-w-xs bg-base-200"
        />
      </div>
    </div>
    <div v-if="alertInfo" :class="`alert alert-${alertInfo.type}`">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>{{ alertInfo.message }}</span>
    </div>
    <table class="table w-full">
        <thead class="text-xs">
            <th>Nik</th>
            <th width="20%">Nama</th>
            <th>TPS</th>
            <th>Umur</th>
            <th>Jenis Kelamin</th>
            <th>Kecamatan</th>
            <th>Desa</th>
            <th>Jenis Pemilih</th>
            <th width="15%">Aksi</th>
        </thead>
        <tbody class="text-xs">
            <tr v-for="item in paginatedData" :key="item.nik">
              <td>{{ item.nik }}</td>
              <td>{{ item.nama }}</td>
              <td>{{ item.tps }}</td>
              <td>{{ item.umur }}</td>
              <td>{{ item.jenis_kelamin }}</td>
              <td>{{ item.kecamatan }}</td>
              <td>{{ item.desa }}</td>
              <td>{{ item.jenis_pemilih }}</td>
              <td>
                <button @click="handleEdit(item)" class="btn btn-ghost btn-xs inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-blue-500 cursor-pointer hover:text-red-700 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125m-1.686 4.492l-1.687-1.689m0 0L19.5 10.125" />
                </svg>
                <!-- Jika ingin menambahkan teks -->
                <!-- Edit -->
              </button>

              <button @click="deleteData(item.nik)" class="btn btn-ghost btn-xs inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-blue-500 cursor-pointer hover:text-red-700 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m0 0L5.79 19.673" />
                </svg>
                <!-- Jika ingin menambahkan teks -->
                <!-- Delete -->
              </button>
                            </td>
                          </tr>
                      </tbody>
                    </table>
                  <div class="join mt-4 flex justify-center">
                    <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-sm btn-outline join-item">Previous</button>
                    <span class="join-item px-4 flex items-center">
                      Page {{ currentPage }} of {{ totalPages }}
                    </span>
                    <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-sm btn-outline join-item">Next</button>
                  </div>
                </div>
                <EditPemilih
                  ref="editModal"
                  @refresh-data="emitRefresh"
                />
</template>

<script setup>
import { computed, defineEmits, ref, onMounted, watch } from 'vue'
import EditPemilih from './modal/EditPemilih.vue'
import { useVoters } from '~/composables/useVoters'

const { voters, fetchVoters } = useVoters()

const emit = defineEmits(['refresh-data'])
const alertInfo = ref(null)
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 15

// Computed untuk search dan filter tanpa pengurutan tambahan
const filteredData = computed(() => {
  if (!voters.value) return []
  return voters.value.filter(item => 
    item.nama.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Computed untuk pagination
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredData.value.slice(start, end)
})

const totalPages = computed(() => 
  Math.ceil(filteredData.value.length / itemsPerPage)
)

// Watch untuk search query
watch(searchQuery, () => {
  currentPage.value = 1
})

const emitRefresh = async () => {
  try {
    await fetchVoters()
    currentPage.value = 1
    emit('refresh-data')
  } catch (error) {
    console.error('Error refreshing data:', error)
  }
}

const deleteData = async (nik) => {
  try {
    const response = await fetch(`/api/deleteVoter?nik=${nik}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      alertInfo.value = {
        type: 'success',
        message: 'Data pemilih berhasil dihapus',
      }
      await emitRefresh()
      setTimeout(() => {
        alertInfo.value = null
      }, 3000)
    } else {
      alertInfo.value = {
        type: 'error',
        message: 'Gagal menghapus data pemilih',
      }
      setTimeout(() => {
        alertInfo.value = null
      }, 3000)
      console.error('Gagal menghapus data pemilih');
    }
  } catch (error) {
    alertInfo.value = {
      type: 'error',
      message: 'Terjadi kesalahan saat menghapus data pemilih',
    }
    setTimeout(() => {
      alertInfo.value = null
    }, 3000)
    console.error('Terjadi kesalahan:', error);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const editModal = ref(null)

const handleEdit = (item) => {
  editModal.value?.openModal(item)
}

onMounted(async () => {
  await fetchVoters()
})

// Watch voters untuk update
watch(voters, () => {
  // Reset ke halaman pertama jika data berubah
  currentPage.value = 1
}, { deep: true })
</script>

<style scoped>
.table {
  @apply bg-base-200;
}

th {
  @apply bg-base-300;
}

tr:hover {
  @apply bg-base-300;
}

.input-group {
  display: flex;
  width: 100%;
  max-width: 400px;
}

.input-group input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.input-group button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
