<script setup>
import { ref, defineEmits } from 'vue'
import { NikParser } from '../../utils/nikParser.js'

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

    const { data: kecamatanData } = await useFetch(`/api/kecamatan/${selectedDesa.id_kecamatan}`)
    if (!kecamatanData.value) {
      throw new Error('Kecamatan tidak ditemukan')
    }

    // Siapkan data untuk dikirim
    const voterData = {
      nik: formData.value.nik,
      nama: formData.value.nama,
      tps: formData.value.tps,
      umur: nikData.umur,
      jenis_kelamin: nikData.jenisKelamin,
      kecamatan: kecamatanData.value.data.nama_kecamatan,
      desa: formData.value.desa,
      jenis_pemilih: formData.value.jenis_pemilih
    }

    // Kirim data ke API
    const { data: result } = await useFetch('/api/insertVoters', {
      method: 'POST',
      body: voterData
    })

    if (!result.value.success) {
      throw new Error(result.value.message)
    }

    if (result.value.success) {
      showAlert('success', 'Data berhasil disimpan!')
      // Reset form dan tutup modal
      formData.value = {
        nik: '',
        nama: '',
        tps: '',
        kecamatan: '',
        desa: '',
        jenis_pemilih: ''
      }
      
      
      // Emit event untuk memperbarui data
      emit('refresh-data')
    }
  } catch (error) {
    showAlert('error', error.message)
    console.error('Error submitting form:', error)
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

  <button @click="open = true" class="flex items-center gap-2 group">
    <div class="chat chat-end">
        <span class="chat-bubble bg-slate-200 text-black cursor-pointer opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-in-out text-sm w-40 font-bold">Tambah Pemilih</span>
    </div>
      <Icon name="line-md:account-add" class="text-blue-500 cursor-pointer hover:text-red-700"/>
  </button>

  <div v-if="open" class="fixed bottom-1 left-50 right-3 z-[999] flex items-center justify-center">
    <div class="bg-emerald-200 border border-spacing-1 border-success rounded-lg shadow-xl p-6 w-[1100px] max-h-[90vh] overflow-y-auto">
      <form @submit.prevent="submitForm" class="space-y-6">
        <div class="flex flex-wrap gap-4 px-4">
          <!-- Input NIK -->
          <div class="form-control flex-1 min-w-[200px]">
            <input 
              v-model="formData.nik"
              type="text" 
              placeholder="Masukkan NIK" 
              class="input input-bordered input-success w-full" 
            />
          </div>

          <!-- Input NAMA -->
          <div class="form-control flex-1 min-w-[200px]">
            <input 
              v-model="formData.nama"
              type="text" 
              placeholder="Masukkan Nama" 
              class="input input-bordered input-success w-full" 
            />
          </div>

          <!-- Input TPS -->
          <div class="form-control w-32">
            <select v-model="formData.tps" class="select select-bordered select-success w-full">
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
            <select v-model="formData.desa" class="select select-bordered select-success w-full">
              <option value="" disabled selected>Pilih Desa</option>
              <option v-for="desa in sortedDesas" :key="desa.id" :value="desa.nama_desa">
                {{ desa.nama_desa }}
              </option>
            </select>
          </div>

          <!-- Input Jenis Pemilih -->
          <div class="form-control w-48">
            <select v-model="formData.jenis_pemilih" class="select select-bordered select-success w-full">
              <option value="" disabled selected>Jenis Pemilih</option>
              <option value="Keluarga">Keluarga</option>
              <option value="Umum">Umum</option>
            </select>
          </div>
        </div>

        <!-- Tombol Submit -->
        <div class="flex justify-end gap-2 mt-6">
          <button @click="handleClose" type="button" class="btn btn-warning btn-sm">
            Tutup
          </button>
          <button type="submit" class="btn btn-primary btn-sm">
            Simpan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>