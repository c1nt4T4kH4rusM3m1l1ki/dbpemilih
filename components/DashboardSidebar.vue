<template>
  <div class="drawer-side">
    <label for="dashboard-drawer" class="drawer-overlay"></label>
    <aside class="bg-base-100 w-70 min-h-screen border-r">
      <div class="p-4">
        <h1 class="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      <ul class="menu p-4 gap-2">
        <li>
          <NuxtLink to="/" class="sidebar-link">
            <Icon name="line-md:home-twotone" class="h-5 w-5" />
            Dashboard
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/perencanaan" class="sidebar-link">
            <Icon name="prime:book" class="h-5 w-5" />
            Perencanaan
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/kegiatan" class="sidebar-link">
            <Icon name="prime:list-check" class="h-5 w-5" />
            Kegiatan
          </NuxtLink>
          <ul>
            <li>
              <NuxtLink to="/kegiatan/ipkd" class="sidebar-link">
                <Icon name="prime:money-bill" class="h-5 w-5" />
                IPKD
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  </div>
</template>