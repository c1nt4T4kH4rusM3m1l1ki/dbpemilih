<template>
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold">Users Management</h1>
    <button class="btn btn-primary" @click="$emit('add-user')">Add New User</button>
  </div>
</template>

<script setup>
defineEmits(['add-user'])
</script>