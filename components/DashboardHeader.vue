<template>
  <header class="navbar bg-base-100 border-b fixed top-0 left-0 right-0 z-[90]">
    <div class="flex-none lg:hidden">
      <label for="dashboard-drawer" class="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </label>
    </div>

    <!-- Status Role -->
    <div class="flex-1 flex items-center gap-2">
      <div class="badge" :class="roleClass">
        <Icon :name="roleIcon" class="w-4 h-4 mr-1" />
        {{ roleText }}
      </div>
    </div>

    <!-- Logout Button -->
    <div class="flex-none gap-2">
      <div class="w-10 rounded-full">
        <Icon 
          @click="openModal" 
          name="heroicons:arrow-right-on-rectangle" 
          class="text-red-500 cursor-pointer font-bold text-2xl m-2 hover:text-blue-600" 
        />
      </div>
    </div>

    <!-- Logout Modal -->
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
import { computed } from 'vue'

const { logout, userRole } = useAuth()

// Computed properties untuk role
const roleClass = computed(() => ({
  'badge-primary': userRole.value === 'admin',
  'badge-secondary': userRole.value === 'user'
}))

const roleText = computed(() => 
  userRole.value === 'admin' ? 'Administrator' : 'Pengguna'
)

const roleIcon = computed(() => 
  userRole.value === 'admin' ? 'heroicons:user-circle' : 'heroicons:user'
)

// Logout handlers
const handleLogout = () => {
  try {
    logout()
    closeModal()
  } catch (error) {
    console.error('Logout gagal:', error)
  }
}

const openModal = () => {
  document.getElementById('logout_modal')?.showModal()
}

const closeModal = () => {
  document.getElementById('logout_modal')?.close()
}
</script>

<style scoped>
.navbar {
  @apply px-4 lg:pl-[296px];
}

.badge {
  @apply text-sm font-medium px-3 py-1 flex items-center;
}
</style>
