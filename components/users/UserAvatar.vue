<template>
  <div class="flex items-center gap-3">
    <div class="avatar">
      <div class="w-8 rounded-full">
        <img :src="user.avatar" :alt="user.name" />
      </div>
    </div>
    <div>
      <div class="font-bold">{{ user.name }}</div>
      <div class="text-sm opacity-50">{{ user.email }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true
  }
})
</script>