
<template>
 <div class="max-w-4xl mx-auto bg-white p-5 rounded-md shadow-xl">
        <h1 class="text-3xl font-bold my-4">Langkah-Langkah Sistem Autentikasi Nuxt 3</h1>

        <h2 class="text-2xl font-bold my-4">Pendahuluan</h2>
        <p class="mb-4">Dokumen ini memberikan panduan langkah demi langkah untuk mengimplementasikan sistem autentikasi (Login & Logout) menggunakan Nuxt 3.</p>

        <h2 class="text-2xl font-bold my-4">Langkah-Langkah</h2>

        <h3 class="text-xl font-bold my-4">1. Siapkan Struktur Proyek</h3>
        <p>Buat struktur direktori seperti berikut:</p>
        <pre><code>my-auth-app/
├── composables/
│   └── useAuth.ts
├── middleware/
│   ├── auth.ts
│   └── guest.ts
├── pages/
│   ├── login.vue
│   └── profile.vue
├── server/
│   └── api/
│       ├── login.post.ts
│       └── logout.post.ts
├── nuxt.config.ts
└── ...</code></pre>

        <h3 class="text-xl font-bold my-4">2. Buat API Routes</h3>
        <p>Kode berikut mengatur login dan logout:</p>

        <h4>Login</h4>
        <pre><code>import { defineEventHandler, readBody, setCookie } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;

  if (username === 'user' && password === 'password') {
    setCookie(event, 'isAuthenticated', 'true', { httpOnly: true, path: '/', maxAge: 86400 });
    setCookie(event, 'user', JSON.stringify({ name: 'User', email: 'user@example.com' }), { httpOnly: true, path: '/', maxAge: 86400 });
    return { success: true };
  }

  return { success: false, message: 'Invalid credentials' };
});</code></pre>

        <h4>Logout</h4>
        <pre><code>import { defineEventHandler, setCookie } from 'h3';

export default defineEventHandler((event) => {
  setCookie(event, 'isAuthenticated', '', { httpOnly: true, path: '/', maxAge: -1 });
  setCookie(event, 'user', '', { httpOnly: true, path: '/', maxAge: -1 });
  return { success: true };
});</code></pre>

        <h3 class="text-xl font-bold my-4">3. Tambahkan Composable useAuth</h3>
        <p>Gunakan composable untuk logika login dan logout:</p>
        <pre><code>import { useCookie } from '#app';

export const useAuth = () => {
  const isAuthenticated = useCookie('isAuthenticated', { default: () => false });
  const user = useCookie('user', { default: () => '' });

  const login = async (username, password) => {
    const response = await $fetch('/api/login', { method: 'POST', body: { username, password } });
    if (response.success) {
      isAuthenticated.value = true;
      user.value = response.user;
    }
  };

  const logout = async () => {
    await $fetch('/api/logout', { method: 'POST' });
    isAuthenticated.value = false;
    user.value = '';
  };

  return { isAuthenticated, user, login, logout };
};</code></pre>

        <h3 class="text-xl font-bold my-4">4. Buat Middleware</h3>
        <p>Gunakan middleware untuk melindungi halaman:</p>

        <h4 class="text-xl font-bold mb-4">auth.ts</h4>
        <pre><code>export default defineNuxtRouteMiddleware(() => {
  const isAuthenticated = useCookie('isAuthenticated').value;
  if (!isAuthenticated) {
    return navigateTo('/login');
  }
});</code></pre>

        <h4 class="text-xl font-bold mb-4">guest.ts</h4>
        <pre><code>export default defineNuxtRouteMiddleware(() => {
  const isAuthenticated = useCookie('isAuthenticated').value;
  if (isAuthenticated) {
    return navigateTo('/profile');
  }
});</code></pre>

        <h3 class="text-xl font-bold my-4">5. Buat Halaman Login</h3>
        <pre class="bg-gray-100 p-2 border border-gray-300 rounded-md overflow-x-auto">
          <code class="text-red-600 bg-pink-50 px-1 py-0.5 rounded-sm">&lt;template&gt;
            &lt;form @submit.prevent="handleLogin"&gt;
              &lt;input v-model="username" type="text" placeholder="Username" required /&gt;
              &lt;input v-model="password" type="password" placeholder="Password" required /&gt;
              &lt;button type="submit"&gt;Login&lt;/button&gt;
            &lt;/form&gt;
          &lt;/template&gt;

          &lt;script setup&gt;
                        import { useAuth } from '~/composables/useAuth';

              const { login } = useAuth();
              const username = ref('');
              const password = ref('');

              const handleLogin = async () => {
                await login(username.value, password.value);
              };
&lt;/script&gt;</code></pre>

        <h3 class="text-xl font-bold my-4">6. Buat Halaman Profil</h3>
        <pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;p&gt;Nama: {{ user.name }}&lt;/p&gt;
    &lt;p&gt;Email: {{ user.email }}&lt;/p&gt;
    &lt;button @click="handleLogout"&gt;Logout&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { useAuth } from '~/composables/useAuth';

const { user, logout } = useAuth();

const handleLogout = async () => {
  await logout();
};
&lt;/script&gt;</code></pre>

        <h3 class="text-xl font-bold my-4">7. Uji dan Debug</h3>
        <p>Gunakan <code>curl</code> atau browser untuk menguji:</p>
        <ul>
            <li>Login: Pastikan cookie disimpan dan halaman diarahkan ke profil.</li>
            <li>Logout: Pastikan cookie dihapus dan diarahkan ke login.</li>
            <li>Middleware: Periksa akses halaman berdasarkan status login.</li>
        </ul>

        <h3 class="text-xl font-bold my-4">8. Restart Server</h3>
        <p>Jalankan <code>npm run dev</code> untuk memulai ulang server setelah implementasi.</p>

        <h2>Kesimpulan</h2>
        <p>Panduan ini memberikan langkah-langkah sederhana untuk membangun sistem autentikasi yang aman di Nuxt 3. Pastikan setiap bagian diuji dengan baik untuk hasil yang optimal.</p>
    </div>
</template>

<script setup>
const user ={
    name: 'John Doe',
    email: '2ZD3T@example.com'
}
</script>

<style scoped>
        pre { background: #f4f4f4; padding: 10px; border: 1px solid #ddd; border-radius: 5px; overflow-x: auto; }
        code { color: #c7254e; background-color: #f9f2f4; padding: 2px 4px; border-radius: 4px; }
</style>

