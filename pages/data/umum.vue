<template>
     <div class="container mx-auto">
        <h1 class="text-2xl font-bold mb-4 text-center">DATA PEMILIH UMUM</h1>
    </div>
    <div class="container mx-auto">
        <DataUmumCardTotal/>
    </div>
    <DataUmumTable/>
</template>

<script setup>
definePageMeta({
    middleware:['auth']
})
</script>
