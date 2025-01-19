<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <button @click="open = true" class="flex items-center gap-2 group">
    <div class="chat chat-end">
        <span class="chat-bubble bg-slate-200 text-black cursor-pointer opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-in-out text-sm w-40 font-bold">Tambah Pemilih</span>
    </div>
      <Icon name="line-md:account-add" class="text-blue-500 cursor-pointer hover:text-red-700"/>
  </button>

  <div v-if="open" class="fixed bottom-1 left-50 right-3 z-[999] flex items-center justify-center">
    <div class="bg-orange-950 rounded-lg shadow-xl p-6 w-[1100px] max-h-[90vh] overflow-y-auto">

      <form @submit.prevent class="space-y-6">
        <div class="flex flex-wrap gap-4 px-4">
          <!-- Input NIK -->
          <div class="form-control flex-1 min-w-[200px]">
            <input type="text" placeholder="Masukkan NIK" class="input input-bordered w-full" />
          </div>

          <!-- Input NAMA -->
          <div class="form-control flex-1 min-w-[200px]">
            <input type="text" placeholder="Masukkan Nama" class="input input-bordered w-full" />
          </div>

          <!-- Input TPS -->
          <div class="form-control w-32">
            <select class="select select-bordered w-full">
              <option disabled selected>Pilih TPS</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>

          <!-- Input Desa -->
          <div class="form-control flex-1 min-w-[200px]">
            <input type="text" placeholder="Masukkan Desa" class="input input-bordered w-full" />
          </div>

          <!-- Input Jenis Pemilih -->
          <div class="form-control w-48">
            <select class="select select-bordered w-full">
              <option disabled selected>Jenis Pemilih</option>
              <option>Keluarga</option>
              <option>Umum</option>
            </select>
          </div>
        </div>

        <!-- Tombol Submit -->
        <div class="flex justify-end gap-2 mt-6">
          <button @click="open = false" class="btn btn-warning btn-sm">
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