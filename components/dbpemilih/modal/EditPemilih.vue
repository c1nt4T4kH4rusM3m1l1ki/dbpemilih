<script setup>
import { ref, onMounted, computed } from 'vue'

const open = ref(false)
const alertInfo = ref(null)
const formData = ref({
  nik: '',
  nama: '',
  tps: '',
  desa: '',
  jenis_pemilih: ''
})

const emit = defineEmits(['refresh-data'])

// Tambahkan ref untuk daftar desa
const desas = ref([])

// Fungsi untuk mengambil data desa
const fetchDesas = async () => {
  try {
    const { data } = await useFetch('/api/desa')
    if (data.value) {
      desas.value = data.value
    }
  } catch (error) {
    console.error('Error fetching desa:', error)
  }
}

// Panggil fetchDesas saat komponen dimount
onMounted(() => {
  fetchDesas()
})

// Computed property untuk mengurutkan desa
const sortedDesas = computed(() => {
  return [...desas.value].sort((a, b) => 
    a.nama_desa.localeCompare(b.nama_desa)
  )
})

const showAlert = (type, message) => {
  alertInfo.value = {
    type,
    message
  }
  setTimeout(() => {
    alertInfo.value = null
  }, 3000)
}

// Fungsi untuk membuka modal dan mengisi form
const openModal = (voter) => {
  formData.value = { ...voter }
  open.value = true
}

const submitForm = async () => {
  try {
    const { data: result } = await useFetch('/api/updateVoter', {
      method: 'PUT',
      body: formData.value
    })

    if (result.value?.success) {
      showAlert('success', 'Data berhasil diperbarui!')
      open.value = false
      emit('refresh-data')
    } else {
      throw new Error(result.value?.message || 'Gagal memperbarui data')
    }
  } catch (error) {
    showAlert('error', error.message)
  }
}

defineExpose({ openModal })
</script>

<template>
  <!-- Alert Component -->
  <div v-if="alertInfo" class="toast toast-top toast-end z-[1000]">
    <div v-if="alertInfo.type === 'success'" class="alert alert-success">
      <span class="flex items-center gap-2">
        <Icon name="ph:check-circle-bold" />
        {{ alertInfo.message }}
      </span>
    </div>
    <div v-if="alertInfo.type === 'error'" class="alert alert-error">
      <span class="flex items-center gap-2">
        <Icon name="ph:x-circle-bold" />
        {{ alertInfo.message }}
      </span>
    </div>
  </div>

  <div v-if="open" class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-xl p-6 w-[800px]">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold">Edit Data Pemilih</h3>
        <button @click="open = false" class="btn btn-circle btn-sm btn-ghost">
          <Icon name="ic:round-close" size="20"/>
        </button>
      </div>

      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-2 gap-4">
          <!-- NIK (readonly karena primary key) -->
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text font-medium">NIK</span>
            </label>
            <input type="text" v-model="formData.nik" readonly class="input input-bordered w-full bg-gray-100" />
          </div>

          <!-- Nama -->
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text font-medium">Nama</span>
            </label>
            <input type="text" v-model="formData.nama" class="input input-bordered w-full" />
          </div>

          <!-- TPS -->
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text font-medium">TPS</span>
            </label>
            <select v-model="formData.tps" class="select select-bordered w-full">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <!-- Desa -->
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text font-medium">Desa</span>
            </label>
            <select v-model="formData.desa" class="select select-bordered w-full">
              <option value="" disabled>Pilih Desa</option>
              <option 
                v-for="desa in sortedDesas" 
                :key="desa.id" 
                :value="desa.nama_desa"
              >
                {{ desa.nama_desa }}
              </option>
            </select>
          </div>

          <!-- Jenis Pemilih -->
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text font-medium">Jenis Pemilih</span>
            </label>
            <select v-model="formData.jenis_pemilih" class="select select-bordered w-full">
              <option value="Keluarga">Keluarga</option>
              <option value="Umum">Umum</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end gap-2 mt-6">
          <button type="button" @click="open = false" class="btn btn-ghost">
            Batal
          </button>
          <button type="submit" class="btn btn-primary">
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  </div>
</template> 