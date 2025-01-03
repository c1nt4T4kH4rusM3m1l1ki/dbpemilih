<template>
  <div class="flex gap-2">
    <button class="btn btn-sm btn-ghost" @click="$emit('edit', user)">Edit</button>
    <button class="btn btn-sm btn-error btn-ghost" @click="$emit('delete', user)">Delete</button>
  </div>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'delete'])
</script>