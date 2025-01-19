<template>
     <table class="table">
        <thead class="text-base">
            <th>Nik</th>
            <th>Nama</th>
            <th>TPS</th>
            <th>Umur</th>
            <th>Jenis Kelamin</th>
            <th>Kecamatan</th>
            <th>Desa</th>
            <th>Jenis Pemilih</th>
            <th>Aksi</th>
        </thead>
        <tbody>
            <tr v-for="item in tableData" :key="item.Nik">
              <td>{{ item.Nik }}</td>
              <td>{{ item.Nama }}</td>
              <td>{{ item.TPS }}</td>
              <td>{{ item.Umur }}</td>
              <td>{{ item.JenisKelamin }}</td>
              <td>{{ item.Kecamatan }}</td>
              <td>{{ item.Desa }}</td>
              <td>{{ item.JenisPemilih }}</td>
              <td>
                <Icon name="line-md:edit-full-twotone" class="text-blue-500 cursor-pointer hover:text-red-700" />
                <Icon name="material-symbols:delete-outline" class="text-blue-500 cursor-pointer hover:text-red-700 ml-3" />
              </td>
            </tr>
        </tbody>
      </table>
</template>

<script setup>
const { data: pemilih } = await useFetch('/api/datapemilih')

const tableData = computed(() => {
  return pemilih.value || []
})
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f5f5f5;
  font-weight: 600;
}

tr:hover {
  background-color: #f9f9f9;
}
</style>