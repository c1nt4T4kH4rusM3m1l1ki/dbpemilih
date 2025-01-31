<template>
  <div class="drawer lg:drawer-open">
    <input id="dashboard-drawer" type="checkbox" class="drawer-toggle" />
    
    <div class="drawer-content flex flex-col min-h-screen">
      <DashboardHeader />
      
      <!-- Main Content -->
      <main class="flex-1 p-4 mt-16">
        <slot />
      </main>
    </div>

    <DashboardSidebar />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
</script>