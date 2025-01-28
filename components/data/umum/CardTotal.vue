<script setup>
const { data: voters } = await useFetch('/api/dashboard/voters')

const totalVoters = computed(() => 
  voters.value?.filter(v => v.jenis_pemilih.toLowerCase() === 'umum').length || 0
)
</script>

<template>
    <div className="card bg-base-100 w-full sm:w-1/4 shadow-sm">
      <div className="card-body">
        <h2 className="text-center text-sm">Total Pemilih Umum</h2>
        <p className="text-center text-5xl text-orange-500 font-bold">{{ totalVoters }}</p>
      </div>
  </div>
</template>