<template>
  <div class="drawer-side">
    <label for="dashboard-drawer" class="drawer-overlay"></label>
    <aside class="bg-base-100 w-70 min-h-screen border-r" >
      <div class="p-4">
        <h1 class="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      <ul class="menu p-4 gap-2">
        <li>
          <NuxtLink to="/" class="sidebar-link"@click="tutupKegiatan">
            <Icon name="line-md:home-twotone" class="h-5 w-5" />
            Dashboard
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/perencanaan" class="sidebar-link" @click="tutupKegiatan">
            <Icon name="prime:book" class="h-5 w-5" />
            Perencanaan
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/kegiatan" class="sidebar-link" @click="toggleKegiatan">
            <Icon name="prime:list-check" class="h-5 w-5" />
            Kegiatan
          </NuxtLink>
          <ul v-if="kegiatan">
            <li>
              <NuxtLink to="/kegiatan/ipkd" class="sidebar-link">
                <Icon name="prime:money-bill" class="h-5 w-5" />
                IPKD
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
// dropdown kegiatan
const kegiatan = ref(false)
const toggleKegiatan = () => {
  kegiatan.value = !kegiatan.value
}

// matikan toggle kegiatan
onMounted(() => {
  kegiatan.value = false
})

// close dropdown ketika navigasi
const tutupKegiatan = () => {
  kegiatan.value = false
}
</script>