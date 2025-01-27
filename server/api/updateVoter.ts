import { client } from '../utils/db'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        
        // Validasi input
        if (!body.nik || !body.nama || !body.tps || !body.desa || !body.jenis_pemilih) {
            throw createError({
                statusCode: 400,
                message: 'Semua field harus diisi'
            })
        }

        const result = await client.execute({
            sql: `UPDATE voters SET 
                  nama = ?, 
                  tps = ?, 
                  desa = ?, 
                  jenis_pemilih = ? 
                  WHERE nik = ?`,
            args: [body.nama, body.tps, body.desa, body.jenis_pemilih, body.nik]
        })

        return {
            success: true,
            message: 'Data berhasil diperbarui',
            data: result
        }

    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Terjadi kesalahan saat memperbarui data'
        }
    }
}) 