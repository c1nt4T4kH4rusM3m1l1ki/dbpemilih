<template>
  <header class="navbar bg-base-100 border-b">
    <div class="flex-none lg:hidden">
      <label for="dashboard-drawer" class="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </label>
    </div>
    <div class="flex-1">
      <div class="form-control">
        
      </div>
    </div>
    <div class="flex-none gap-2">
          <div class="w-10 rounded-full">
            <Icon @click="openModal" name="heroicons:arrow-right-on-rectangle" class="text-red-500 cursor-pointer font-bold text-2xl m-2 hover:text-blue-600" />
          </div>
    </div>
    <dialog id="logout_modal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Perhatian</h3>
        <p class="py-4">Apakah Anda yakin ingin keluar?</p>
        <div class="modal-action">
          <button class="btn btn-sm btn-ghost" @click="closeModal">Tidak</button>
          <button class="btn btn-sm btn-primary" @click="handleLogout">Ya</button>
        </div>
      </div>
    </dialog>
  </header>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'

const { user, logout } = useAuth()

const handleLogout = async () => {
  try {
    await logout()
    closeModal()
  } catch (err) {
    console.error('Logout gagal:', err)
    // Tambahkan logika tambahan jika diperlukan, seperti menampilkan pesan kesalahan
  }
}

const openModal = () => {
  document.getElementById('logout_modal').showModal()
}

const closeModal = () => {
  document.getElementById('logout_modal').close()
}
</script>
