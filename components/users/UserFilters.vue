<template>
  <div class="flex justify-between items-center mb-4">
    <div class="form-control">
      <input 
        type="text" 
        placeholder="Search users..." 
        class="input input-bordered w-full max-w-xs"
        v-model="searchQuery"
        @input="emitSearch"
      />
    </div>
    <div class="flex gap-2">
      <select class="select select-bordered" v-model="perPage" @change="emitFilter">
        <option value="10">10 per page</option>
        <option value="25">25 per page</option>
        <option value="50">50 per page</option>
      </select>
      <select class="select select-bordered" v-model="role" @change="emitFilter">
        <option value="">Filter by Role</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="editor">Editor</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const searchQuery = ref('')
const perPage = ref('10')
const role = ref('')

const emit = defineEmits(['search', 'filter'])

const emitSearch = () => {
  emit('search', searchQuery.value)
}

const emitFilter = () => {
  emit('filter', {
    perPage: Number(perPage.value),
    role: role.value
  })
}
</script>