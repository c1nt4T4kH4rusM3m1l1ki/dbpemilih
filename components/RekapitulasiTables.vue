<template>
  <div class="grid grid-cols-1 gap-8 mt-8">
    <!-- Tabel Rekapitulasi Keluarga -->
    <div class="bg-base-200 rounded-lg shadow p-4">
      <h3 class="text-lg font-semibold mb-4">Rekapitulasi Pemilih Keluarga</h3>
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Desa</th>
            <th>Jumlah Pemilih</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(count, index) in rekapKeluarga" :key="count.desa">
            <td>{{ index + 1 }}</td>
            <td>{{ count.desa }}</td>
            <td>{{ count.total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="font-bold text-right">Total</td>
            <td class="font-bold">{{ totalKeluarga }}</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- Tabel Rekapitulasi umum -->
    <div class="bg-base-200 rounded-lg shadow p-4">
      <h3 class="text-lg font-semibold mb-4">Rekapitulasi Pemilih umum</h3>
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Desa</th>
            <th>Jumlah Pemilih</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(count, index) in rekapUmum" :key="count.desa">
            <td>{{ index + 1 }}</td>
            <td>{{ count.desa }}</td>
            <td>{{ count.total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="font-bold text-right">Total</td>
            <td class="font-bold">{{ totalUmum }}</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- Tabel Rekapitulasi Semua -->
    <div class="bg-base-200 rounded-lg shadow p-4">
      <h3 class="text-lg font-semibold mb-4">Rekapitulasi Semua Pemilih</h3>
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Desa</th>
            <th>Jumlah Pemilih</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(count, index) in rekapSemua" :key="count.desa">
            <td>{{ index + 1 }}</td>
            <td>{{ count.desa }}</td>
            <td>{{ count.total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="font-bold text-right">Total</td>
            <td class="font-bold">{{ totalSemua }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script setup>
const { data: voters } = await useFetch('/api/dashboard/voters')

// Fungsi untuk menghitung rekapitulasi berdasarkan jenis pemilih
const hitungRekap = (data, jenisPemilih = null) => {
  if (!data) return []
  
  const rekap = data.reduce((acc, voter) => {
    if (jenisPemilih && voter.jenis_pemilih !== jenisPemilih) return acc
    
    if (!acc[voter.desa]) {
      acc[voter.desa] = { desa: voter.desa, total: 0 }
    }
    acc[voter.desa].total++
    return acc
  }, {})

  return Object.values(rekap).sort((a, b) => b.total - a.total)
}

// Rekapitulasi untuk pemilih Keluarga
const rekapKeluarga = computed(() => hitungRekap(voters.value, 'Keluarga'))
const totalKeluarga = computed(() => 
  rekapKeluarga.value.reduce((sum, item) => sum + item.total, 0)
)

// Rekapitulasi untuk pemilih umum
const rekapUmum = computed(() => hitungRekap(voters.value, 'umum'))
const totalUmum = computed(() => 
  rekapUmum.value.reduce((sum, item) => sum + item.total, 0)
)

// Rekapitulasi untuk semua pemilih
const rekapSemua = computed(() => hitungRekap(voters.value))
const totalSemua = computed(() => 
  rekapSemua.value.reduce((sum, item) => sum + item.total, 0)
)
</script> 