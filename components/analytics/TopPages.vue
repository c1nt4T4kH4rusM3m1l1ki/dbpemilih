<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Top Performing Pages</h2>
      <DataTable :headers="tableHeaders">
        <tr v-for="page in topPages" :key="page.url">
          <td>{{ page.url }}</td>
          <td>{{ page.views }}</td>
          <td>{{ page.uniqueViews }}</td>
          <td>{{ page.avgTime }}</td>
          <td>{{ page.bounceRate }}</td>
        </tr>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
const tableHeaders = ['Page', 'Views', 'Unique Views', 'Avg. Time', 'Bounce Rate']

const topPages = [
  {
    url: '/home',
    views: '45,232',
    uniqueViews: '38,945',
    avgTime: '2m 15s',
    bounceRate: '32%'
  },
  {
    url: '/products',
    views: '28,345',
    uniqueViews: '24,654',
    avgTime: '3m 45s',
    bounceRate: '28%'
  },
  {
    url: '/blog',
    views: '15,876',
    uniqueViews: '12,543',
    avgTime: '4m 20s',
    bounceRate: '35%'
  }
]
</script>