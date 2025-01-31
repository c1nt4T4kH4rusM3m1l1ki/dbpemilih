<template>
  <div class="container mx-auto px-4">
    <h2 class="text-center mb-5 font-bold text-2xl">DATABASE PEMILIH</h2>

    <div class="grid grid-cols-1 gap-4">
      <div class="w-full">
        <DbpemilihCardtotal 
          :data="pemilih" 
          @refresh-data="refreshData"
        />
      </div>

      <div class="flex justify-end mb-1">
        <DbpemilihModalTambahPemilih @refresh-data="refreshData"/>
      </div>

      <div class="w-full mb-10">
        <DbpemilihTableDatabase 
          :data="pemilih" 
          @refresh-data="refreshData"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth', 'admin']
})

const { data: pemilih, refresh } = await useFetch('/api/voters', {
  key: 'voters-data'
})

const refreshData = async () => {
  try {
    await refresh()
  } catch (error) {
    console.error('Error refreshing data:', error)
  }
}
</script>

<style>
.container {
  min-width: 320px;
  max-width: 1280px;
}
</style>