# Sistem Autentikasi Nuxt 3

Implementasi sistem autentikasi sederhana menggunakan Nuxt 3, dengan fitur login/logout, manajemen sesi, dan penanganan error.

## 🚀 Fitur

- Login dan logout pengguna
- Proteksi rute dengan middleware
- Manajemen sesi menggunakan cookies
- Toggle visibilitas password
- Penanganan error dan validasi
- Mendukung TypeScript
- Desain responsif dengan Tailwind CSS

## 📋 Prasyarat

- Node.js (v16 ke atas)
- Nuxt 3
- Pengetahuan TypeScript
- Pemahaman dasar Vue.js composition API

## 🗂️ Struktur Proyek

```
my-auth-app/
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
└── package.json
```

## 🛠️ Instalasi

1. Clone repositori:
```bash
git clone https://github.com/username/nuxt3-auth-system.git
```

2. Install dependensi:
```bash
cd nuxt3-auth-system
npm install
```

3. Jalankan server pengembangan:
```bash
npm run dev
```

## 🔑 Penggunaan

### Alur Autentikasi

1. Pengguna mengakses halaman login di `/login`
2. Masukkan kredensial (default: username: "user", password: "password")
3. Setelah berhasil login, pengguna diarahkan ke `/profile`
4. Rute yang dilindungi otomatis dijaga oleh middleware auth

### Endpoint API

- POST `/api/login`: Menangani autentikasi pengguna
- POST `/api/logout`: Menangani logout pengguna

### Contoh Login

```typescript
const { login } = useAuth()

try {
  await login(username, password)
  // Redirect ke /profile jika berhasil
} catch (error) {
  // Tangani error login
}
```

## ⚙️ Konfigurasi

### Variabel Lingkungan

Buat file `.env` di direktori root:

```env
NODE_ENV=development
# Tambahkan variabel lingkungan lainnya sesuai kebutuhan
```

### Konfigurasi Nuxt

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    // Tambahkan modul yang diperlukan
  ],
  // Konfigurasi lainnya
})
```

## 🔒 Fitur Keamanan

- Cookie HTTP-only untuk manajemen sesi
- Proteksi CSRF dengan atribut cookie SameSite
- Flag cookie Secure di production
- Toggle visibilitas password
- Rute terproteksi menggunakan middleware

## 🧪 Pengembangan

### Menjalankan Test

```bash
npm run test
```

### Langkah-langkah Pengujian Manual

1. Uji login dengan kredensial valid
2. Uji login dengan kredensial invalid
3. Verifikasi akses rute terproteksi
4. Uji fungsi logout
5. Verifikasi persistensi sesi

## 🤝 Kontribusi

1. Fork repositori
2. Buat branch fitur (`git checkout -b fitur/fitur-keren`)
3. Commit perubahan (`git commit -m 'Menambahkan fitur keren'`)
4. Push ke branch (`git push origin fitur/fitur-keren`)
5. Buat Pull Request

## 📝 Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file [LICENSE.md](LICENSE.md) untuk detail

## 🙏 Ucapan Terima Kasih

- Tim Nuxt.js untuk framework yang luar biasa
- Anthropic's Claude untuk bantuan dokumentasi
- Para kontributor dan pengelola

## 💬 Dukungan

Untuk dukungan, silakan buka issue di repositori GitHub atau hubungi pengelola.
