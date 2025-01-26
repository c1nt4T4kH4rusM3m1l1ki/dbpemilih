<template>
    <div>
      <h2 class="text-center mb-5 font-bold">DATABASE PEMILIH</h2>
    </div>
    <div class="flex justify-end mr-5 mb-1">
      <DashboardModalTambahPemilih @refresh-data="refreshData"/>
    </div>
    <div>
      <DashboardTableDatabase :data="pemilih"/>
    </div>
    
</template>

<script setup>
definePageMeta({
  middleware:['auth']
})

const { data: pemilih, refresh } = await useFetch('/api/voters')

const refreshData = async () => {
  await refresh()
}
</script>

