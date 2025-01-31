<script setup>
import { ref, defineEmits, nextTick } from 'vue'
import { NikParser } from '../../utils/nikParser.js'
import { useVoters } from '~/composables/useVoters'

const emit = defineEmits(['refresh-data'])
const open = ref(false)
const alertInfo = ref({
  show: false,
  type: '', // success, error
  message: ''
})
const formData = ref({
  nik: '',
  nama: '',
  tps: '',
  kecamatan: '',
  desa: '',
  jenis_pemilih: ''
})

// data desa
const {data:desas} = await useFetch('/api/desa')

const { fetchVoters } = useVoters()

const showAlert = (type, message) => {
  alertInfo.value = {
    show: true,
    type,
    message
  }
  
  // Sembunyikan alert setelah 3 detik
  setTimeout(() => {
    alertInfo.value.show = false
  }, 3000)
}

const submitForm = async () => {
  try {
    // Validasi form
    if (!formData.value.nik || !formData.value.nama || !formData.value.tps || 
        !formData.value.desa || !formData.value.jenis_pemilih) {
      throw new Error('Semua field harus diisi')
    }

    // Parse NIK untuk mendapatkan jenis_kelamin dan umur
    const nikData = NikParser.parse(formData.value.nik)
    if (nikData.error) {
      throw new Error('NIK tidak valid: ' + nikData.error)
    }

    // Ambil nama kecamatan berdasarkan desa
    const selectedDesa = desas.value.find(d => d.nama_desa === formData.value.desa)
    if (!selectedDesa) {
      throw new Error('Desa tidak ditemukan')
    }

    // Siapkan data untuk dikirim
    const voterData = {
      nik: formData.value.nik,
      nama: formData.value.nama,
      tps: formData.value.tps,
      umur: nikData.umur,
      jenis_kelamin: nikData.jenisKelamin,
      kecamatan: selectedDesa.nama_kecamatan,
      desa: formData.value.desa,
      jenis_pemilih: formData.value.jenis_pemilih
    }

    // Kirim data ke API
    const response = await fetch('/api/insertVoters', {
      method: 'POST',
      body: JSON.stringify(voterData),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      showAlert('success', 'Data berhasil disimpan!')
      // Reset form
      formData.value = {
        nik: '',
        nama: '',
        tps: '',
        kecamatan: '',
        desa: '',
        jenis_pemilih: ''
      }
      
      // Refresh data langsung dari database
      const freshData = await fetch('/api/dashboard/voters')
      const voters = await freshData.json()
      // Update state dengan data terbaru
      useVoters().voters.value = voters
      
      // Emit event untuk refresh data
      emit('refresh-data')
    }
  } catch (error) {
    showAlert('error', error.message)
  }
}

const sortedDesas = computed(() => {
  if (!desas.value) return []
  return [...desas.value].sort((a, b) =>
    a.nama_desa.localeCompare(b.nama_desa)
  )
})

const resetForm = () => {
  formData.value = {
    nik: '',
    nama: '',
    tps: '',
    kecamatan: '',
    desa: '',
    jenis_pemilih: ''
  }
}

const handleClose = () => {
  resetForm()
  open.value = false
}

</script>

<template>
  <!-- Alert Component -->
  <div v-if="alertInfo.show" class="toast toast-top toast-end z-[1000]">
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

  <button @click="open = true" class="flex items-center gap-2 group badge bg-orange-700 text-white">
      <Icon name="line-md:account-add" class="text-white cursor-pointer hover:text-red-700"/>
      Tambah Pemilih
  </button>

  <div v-if="open" class="fixed bottom-1 left-50 right-3 z-[999] flex items-center justify-center">
    <div class="bg-orange-700 border border-spacing-1 border-orange-500 rounded-lg shadow-xl p-6 w-[1100px] max-h-[90vh] overflow-y-auto">
      <form @submit.prevent="submitForm" class="space-y-6">
        <div class="flex flex-wrap gap-4 px-4">
          <!-- Input NIK -->
          <div class="form-control flex-1 min-w-[200px]">
            <input 
              v-model="formData.nik"
              type="text" 
              placeholder="Masukkan NIK" 
              class="input input-bordered input-orange-500 w-full" 
            />
          </div>

          <!-- Input NAMA -->
          <div class="form-control flex-1 min-w-[200px]">
            <input 
              v-model="formData.nama"
              type="text" 
              placeholder="Masukkan Nama" 
              class="input input-bordered input-orange-500 w-full" 
            />
          </div>

          <!-- Input TPS -->
          <div class="form-control w-32">
            <select v-model="formData.tps" class="select select-bordered select-orange-500 w-full">
              <option value="" disabled selected>Pilih TPS</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <!-- Input Desa -->
          <div class="form-control flex-1 min-w-[200px]">
            <select v-model="formData.desa" class="select select-bordered select-orange-500 w-full">
              <option value="" disabled selected>Pilih Desa</option>
              <option v-for="desa in sortedDesas" :key="desa.id" :value="desa.nama_desa">
                {{ desa.nama_desa }}
              </option>
            </select>
          </div>

          <!-- Input Jenis Pemilih -->
          <div class="form-control w-48">
            <select v-model="formData.jenis_pemilih" class="select select-bordered select-orange-500 w-full">
              <option value="" disabled selected>Jenis Pemilih</option>
              <option value="Keluarga">Keluarga</option>
              <option value="Umum">Umum</option>
            </select>
          </div>
        </div>

        <!-- Tombol Submit -->
        <div class="flex justify-end gap-2 mt-6">
          <button @click="handleClose" type="button" class="btn btn-outline bg-white text-orange-500 btn-sm">
            Tutup
          </button>
          <button type="submit" class="btn btn-neutral btn-sm">
            Simpan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>
