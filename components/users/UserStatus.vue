<template>
  <div class="badge" :class="active ? 'badge-success' : 'badge-error'">
    {{ active ? 'Active' : 'Inactive' }}
  </div>
</template>

<script setup>
defineProps({
  active: {
    type: Boolean,
    required: true
  }
})
</script>