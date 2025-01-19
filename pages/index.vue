<template>
    <div>
      <h2 class="text-center mb-5 font-bold">DATABASE PEMILIH</h2>
    </div>
    <div class="flex justify-end mr-5 mb-1">
      <DashboardModalTambahPemilih/>
    </div>
    <div>
      <DashboardTableDatabase/>
    </div>
    
</template>

<script setup>
definePageMeta({
  middleware:['auth']
})

</script>

