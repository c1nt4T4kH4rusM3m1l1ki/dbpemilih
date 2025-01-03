<template>
  <div class="badge" :class="badgeClass">
    {{ role }}
  </div>
</template>

<script setup>
const props = defineProps({
  role: {
    type: String,
    required: true
  }
})

const badgeClass = computed(() => {
  switch (props.role.toLowerCase()) {
    case 'admin':
      return 'badge-primary'
    case 'editor':
      return 'badge-secondary'
    default:
      return 'badge-ghost'
  }
})
</script>