<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Recent Activity</h2>
      <DataTable :headers="tableHeaders">
        <tr v-for="activity in recentActivity" :key="activity.id">
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="w-8 rounded-full">
                  <img :src="activity.avatar" :alt="activity.user" />
                </div>
              </div>
              <div>{{ activity.user }}</div>
            </div>
          </td>
          <td>{{ activity.action }}</td>
          <td>{{ activity.date }}</td>
          <td>
            <div 
              class="badge" 
              :class="activity.status === 'Completed' ? 'badge-success' : 'badge-warning'"
            >
              {{ activity.status }}
            </div>
          </td>
        </tr>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
const tableHeaders = ['User', 'Action', 'Date', 'Status']

const recentActivity = [
  {
    id: 1,
    user: 'John Doe',
    action: 'Created new project',
    date: '2024-03-20',
    status: 'Completed',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  },
  {
    id: 2,
    user: 'Jane Smith',
    action: 'Updated profile',
    date: '2024-03-19',
    status: 'Pending',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
  }
]
</script>