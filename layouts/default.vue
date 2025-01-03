<template>
  <div class="drawer lg:drawer-open">
    <input id="dashboard-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <DashboardHeader />
      <main class="flex-1 p-6 bg-base-200">
        <slot />
      </main>
    </div>
    <DashboardSidebar />
  </div>
</template>