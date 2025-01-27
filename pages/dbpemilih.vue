<template>
  <div>
    <h2 class="text-center mb-5 font-bold">DATABASE PEMILIH</h2>
  </div>
  <div class="flex justify-end mr-5 mb-1">
    <DbpemilihModalTambahPemilih @refresh-data="refreshData"/>
  </div>
  <div class="mb-96">
    <DbpemilihTableDatabase 
      :data="pemilih" 
      @refresh-data="refreshData"
    />
  </div>
</template>

<script setup>
definePageMeta({
  middleware:['auth']
})

const { data: pemilih } = await useFetch('/api/voters', {
  key: 'voters-data'
})

const refreshData = async () => {
  try {
    await refreshNuxtData('voters-data')
  } catch (error) {
    console.error('Error refreshing data:', error)
  }
}
</script>