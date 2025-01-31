<template>
  <div>
    <!-- ... kode lainnya ... -->
    <NuxtLink 
      v-if="isAdmin()" 
      to="/dbpemilih" 
      class="btn btn-ghost"
    >
      Database Pemilih
    </NuxtLink>
    <!-- ... kode lainnya ... -->
  </div>
</template>

<script setup>
const { isAdmin } = useAuth()
</script> 