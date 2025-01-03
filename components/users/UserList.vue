<template>
  <DataTable :headers="['User', 'Role', 'Status', 'Last Active', 'Actions']">
    <tr v-for="user in users" :key="user.id">
      <td>
        <UserAvatar :user="user" />
      </td>
      <td>
        <UserRole :role="user.role" />
      </td>
      <td>
        <UserStatus :active="user.active" />
      </td>
      <td>{{ user.lastActive }}</td>
      <td>
        <UserActions :user="user" />
      </td>
    </tr>
  </DataTable>
</template>

<script setup>
import UserAvatar from './UserAvatar.vue'
import UserRole from './UserRole.vue'
import UserStatus from './UserStatus.vue'
import UserActions from './UserActions.vue'

defineProps({
  users: {
    type: Array,
    required: true
  }
})
</script>