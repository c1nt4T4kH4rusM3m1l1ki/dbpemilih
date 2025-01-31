<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-base-100 rounded-lg shadow-xl p-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold">Selamat Datang</h1>
        <p class="text-sm text-gray-500 mt-2">Silakan login untuk melanjutkan</p>
      </div>

      <!-- Error Alert -->
      <div v-if="error" class="alert alert-error mb-6 text-sm">
        <Icon name="ph:warning-circle-fill" class="w-5 h-5"/>
        <span>{{ error }}</span>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Username Input -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-medium">Username</span>
          </label>
          <input 
            v-model="username" 
            type="text" 
            class="input input-bordered w-full" 
            required
          />
        </div>

        <!-- Password Input -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-medium">Password</span>
          </label>
          <div class="relative">
            <input 
              v-model="password" 
              :type="passwordFieldType" 
              class="input input-bordered w-full pr-10" 
              required
            />
            <button 
              type="button" 
              @click="togglePasswordVisibility" 
              class="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Icon 
                :name="passwordFieldType === 'password' ? 'heroicons:eye-slash' : 'heroicons:eye'" 
                class="w-5 h-5 text-gray-500"
              />
            </button>
          </div>
        </div>

        <!-- Login Button -->
        <button 
          type="submit" 
          class="btn btn-primary w-full"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'login',
  middleware: 'guest'
})

const { login } = useAuth()
const username = ref('')
const password = ref('')
const error = ref('')
const passwordFieldType = ref('password')

const togglePasswordVisibility = () => {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password'
}

const handleLogin = async () => {
  try {
    error.value = ''
    await login(username.value, password.value)
  } catch (err) {
    error.value = err.message
  }
}
</script>






