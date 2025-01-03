<template>
  <div class="card-stats">
    <div class="card-body">
      <div class="stat">
        <div class="stat-title">{{ title }}</div>
        <div class="stat-value">{{ value }}</div>
        <div class="stat-desc" :class="trend > 0 ? 'text-success' : 'text-error'">
          {{ trend > 0 ? '↗︎' : '↘︎' }} {{ Math.abs(trend) }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  trend: {
    type: Number,
    default: 0
  }
})
</script>