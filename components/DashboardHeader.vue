<template>
  <header class="navbar bg-base-100 border-b">
    <div class="flex-none lg:hidden">
      <label for="dashboard-drawer" class="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </label>
    </div>
    <div class="flex-1">
      <div class="form-control">
        
      </div>
    </div>
    <div class="flex-none gap-2">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <Icon name="ic:round-log-out" class="text-red-500 font-bold text-2xl m-2" />
          </div>
        </label>
        <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-auto">
          <NuxtLink to="/login" @click="handlerLogout">LogOut</NuxtLink>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>

// logout sistem
const {isAuthenticated, logout}= useAuth()

const handlerLogout = ()=>{
  isAuthenticated.value=false
  logout()
}

</script>