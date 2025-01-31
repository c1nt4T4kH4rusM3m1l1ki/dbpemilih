<template>
  <div class="drawer-side z-[100]">
    <label for="dashboard-drawer" class="drawer-overlay"></label>
    <aside class="bg-base-100 w-[280px] min-h-screen border-r" >
      <div class="p-4">
        <h1 class="text-2xl font-bold">Database Pemilih</h1>
      </div>
      <ul class="menu p-4 gap-2">
        <li>
          <NuxtLink to="/" class="sidebar-link" @click="tutupKegiatan">
            <Icon name="line-md:home-md-twotone" class="h-5 w-5" />
            Home
          </NuxtLink>
        </li>
        <li v-if="isAdmin">
          <NuxtLink to="/dbpemilih" class="sidebar-link" @click="tutupKegiatan">
            <Icon name="line-md:file-document-plus-twotone" class="h-5 w-5" />
            Input Pemilih
          </NuxtLink>
        </li>
        <li class="hidden md:block">
          <NuxtLink to="/data" class="sidebar-link" @click="toggleKegiatan">
            <Icon name="line-md:cloud-alt-braces" class="h-5 w-5" />
            Data
          </NuxtLink>
          <ul v-if="kegiatan">
            <li>
              <NuxtLink to="/data/keluarga" class="sidebar-link">
                <Icon name="line-md:person-search" class="h-5 w-5" />
                Keluarga
              </NuxtLink>
              <NuxtLink to="/data/umum" class="sidebar-link">
                <Icon name="line-md:person-search" class="h-5 w-5" />
                Umum
              </NuxtLink>
            </li>
          </ul>
        </li>
        <li class="block md:hidden">
          <NuxtLink to="/database" class="sidebar-link" @click="toggleKegiatan">
            <Icon name="line-md:cloud-alt-braces" class="h-5 w-5" />
            Database
          </NuxtLink>
          <ul v-if="kegiatan">
            <li>
              <NuxtLink to="/database/keluarga" class="sidebar-link">
                <Icon name="line-md:person-search" class="h-5 w-5" />
                Keluarga
              </NuxtLink>
              <NuxtLink to="/database/umum" class="sidebar-link">
                <Icon name="line-md:person-search" class="h-5 w-5" />
                Umum
              </NuxtLink>
            </li>
          </ul>
        </li>
        <li>
          <NuxtLink to="/panduan" class="sidebar-link" @click="tutupKegiatan">
            <Icon name="prime:github" class="h-5 w-5" />
            Panduan
          </NuxtLink>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { isAdmin } = useAuth()
const kegiatan = ref(false)

// Pastikan sidebar tetap terbuka di desktop
onMounted(() => {
  const drawer = document.getElementById('dashboard-drawer')
  if (drawer && window.innerWidth >= 1024) {
    drawer.checked = true
  }
})

const toggleKegiatan = () => {
  kegiatan.value = !kegiatan.value
}

const tutupKegiatan = () => {
  kegiatan.value = false
  // Tutup drawer di mobile
  if (window.innerWidth < 1024) {
    const drawer = document.getElementById('dashboard-drawer')
    if (drawer) drawer.checked = false
  }
}
</script>

<style scoped>
.drawer-side {
  position: fixed;
  height: 100vh;
}

@media (min-width: 1024px) {
  .drawer-side {
    position: fixed;
    left: 0;
  }
}
</style>