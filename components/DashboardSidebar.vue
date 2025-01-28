<template>
  <div class="drawer-side">
    <label for="dashboard-drawer" class="drawer-overlay"></label>
    <aside class="bg-base-100 w-70 min-h-screen border-r" >
      <div class="p-4">
        <h1 class="text-2xl font-bold">Database Pemilih</h1>
      </div>
      <ul class="menu p-4 gap-2">
        <li>
          <NuxtLink to="/" class="sidebar-link"@click="tutupKegiatan">
            <Icon name="line-md:home-md-twotone" class="h-5 w-5" />
            Home
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/dbpemilih" class="sidebar-link" @click="tutupKegiatan">
            <Icon name="line-md:file-document-plus-twotone" class="h-5 w-5" />
            Input Pemilih
          </NuxtLink>
        </li>
        <li>
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