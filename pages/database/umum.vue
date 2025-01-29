<template>
    <div>
        <h1 class="text-center text-2xl font-bold">Data Pemilih Umum</h1>
    </div>
    <div class="container mx-auto">
        <DataUmumCardTotal/>
    </div>
    <div>
        <DatabaseUmumAccor/>
    </div>
</template>

<script setup>
definePageMeta({
    middleware:['auth']
})

</script>