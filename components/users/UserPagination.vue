<template>
  <div class="flex justify-between items-center mt-4">
    <div>
      Showing {{ startIndex }}-{{ endIndex }} of {{ total }} users
    </div>
    <div class="join">
      <button 
        class="join-item btn" 
        :disabled="currentPage === 1"
        @click="$emit('page-change', currentPage - 1)"
      >«</button>
      <button 
        v-for="page in pages" 
        :key="page"
        class="join-item btn"
        :class="{ 'btn-active': page === currentPage }"
        @click="$emit('page-change', page)"
      >{{ page }}</button>
      <button 
        class="join-item btn"
        :disabled="currentPage === totalPages"
        @click="$emit('page-change', currentPage + 1)"
      >»</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  total: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  }
})

defineEmits(['page-change'])

const totalPages = computed(() => Math.ceil(props.total / props.perPage))
const startIndex = computed(() => ((props.currentPage - 1) * props.perPage) + 1)
const endIndex = computed(() => Math.min(startIndex.value + props.perPage - 1, props.total))

const pages = computed(() => {
  const range = []
  for (let i = 1; i <= totalPages.value; i++) {
    range.push(i)
  }
  return range
})
</script>