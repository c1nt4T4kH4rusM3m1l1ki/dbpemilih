<template>
  <div class="container mx-auto px-4">
    <h1 class="text-2xl font-bold my-6 text-center">DATA PEMILIH UMUM</h1>
    
    <!-- Card Total -->
    <div class="mb-6">
      <DataUmumCardTotal :data="pemilih"/>
    </div>

    <!-- Table -->
    <div class="mb-10">
      <DataUmumTable 
        :data="pemilih"
        @refresh-data="refreshData"
      />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})

// Fetch data khusus pemilih umum
const { data: pemilih, refresh } = await useFetch('/api/voters', {
  query: { 
    jenis_pemilih: 'umum'
  }
})

const refreshData = async () => {
  try {
    await refresh()
  } catch (error) {
    console.error('Error refreshing data:', error)
  }
}
</script>
