<script setup>
// Definisikan props untuk menerima data
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

// Definisikan emit
const emit = defineEmits(['refresh-data'])

// Hitung total data menggunakan props yang diterima
const totalVoters = computed(() => {
  return props.data?.pagination?.total || 0
})

</script>

<template>
    <div className="card bg-base-100 w-full sm:w-1/4 shadow-sm">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="text-center text-sm">Total Pemilih</h2>
          <button 
            className="btn btn-circle btn-sm btn-ghost"
            @click="emit('refresh-data')"
            title="Refresh data">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        <p className="text-center text-5xl text-primary font-bold">{{ totalVoters }}</p>
      </div>
    </div>
</template>
