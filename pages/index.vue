<template>
    <div>
        <div class="p-4">
      <h1 class="text-3xl font-bold mb-4">DaisyUI Test</h1>
      
      <!-- DaisyUI Button Examples -->
      <div class="space-x-2 mb-4">
        <NuxtLink to='/login' class="btn btn-ghosh">Login</NuxtLink>
        <button class="btn btn-secondary">Secondary Button</button>
        <button class="btn btn-accent">Accent Button</button>
      </div>

      <!-- DaisyUI Alert -->
      <div class="alert alert-info mb-4">
        <span>DaisyUI is now working!</span>
      </div>

      <!-- Theme Toggle -->
      <select class="select select-bordered w-full max-w-xs" data-choose-theme>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="cupcake">Cupcake</option>
      </select>
    </div>
    </div>
</template>

<script setup>
definePageMeta({
  middleware:['auth']
})


</script>

