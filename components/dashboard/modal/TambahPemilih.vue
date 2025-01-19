<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <button @click="open = true" class="flex items-center gap-2 group">
    <div class="chat chat-end">
        <span class="chat-bubble chat-bubble-warning text-black cursor-pointer opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-in-out text-xs">Tambah Pemilih</span>
    </div>
      <Icon name="line-md:account-add" class="text-blue-500 cursor-pointer hover:text-red-700"/>
  </button>

  <div v-if="open" class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-xl p-6 w-[800px] max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold">Tambah Data Pemilih</h3>
        <button @click="open = false" class="btn btn-circle btn-sm btn-ghost">
          <Icon name="ic:round-close" size="20"/>
        </button>
      </div>

      <form @submit.prevent>
        <div class="grid grid-cols-2 gap-4">
          <!-- Input NIK -->
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text font-medium">NIK</span>
            </label>
            <input type="text" placeholder="Masukkan NIK" class="input input-bordered w-full" />
          </div>

          <!-- Input NAMA -->
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text font-medium">NAMA</span>
            </label>
            <input type="text" placeholder="Masukkan Nama" class="input input-bordered w-full" />
          </div>

          <!-- Input TPS -->
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text font-medium">TPS</span>
            </label>
            <input type="number" placeholder="Masukkan TPS" class="input input-bordered w-full" />
          </div>

          <!-- Input Desa -->
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text font-medium">Desa</span>
            </label>
            <input type="text" placeholder="Masukkan Desa" class="input input-bordered w-full" />
          </div>

          <!-- Input Jenis Pemilih -->
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text font-medium">Jenis Pemilih</span>
            </label>
            <select class="select select-bordered w-full">
              <option disabled selected>Pilih Jenis</option>
              <option>Keluarga</option>
              <option>Umum</option>
            </select>
          </div>
        </div>

        <!-- Tombol Submit -->
        <div class="flex justify-end gap-2 mt-6">
          <button @click="open = false" class="btn btn-ghost">
            Batal
          </button>
          <button type="submit" class="btn btn-primary">
            Simpan Data
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>