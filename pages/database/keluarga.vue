<template>
    <div>
        <h1 class="text-center text-2xl font-bold">Data Pemilih Keluarga</h1>
    </div>
    <div class="container mx-auto">
        <DataKeluargaCardTotal/>
    </div>
    <div>
        <DatabaseKeluargaAccor/>
    </div>

</template>
<script setup>
definePageMeta({
    middleware:['auth']
})

</script>