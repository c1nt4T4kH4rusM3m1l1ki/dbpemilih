import { client } from '../utils/db'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        
        // Validasi input
        const requiredFields = ['nik', 'nama', 'tps', 'umur', 'jenis_kelamin', 'kecamatan', 'desa', 'jenis_pemilih']
        for (const field of requiredFields) {
            if (!body[field]) {
                throw createError({
                    statusCode: 400,
                    message: `Field ${field} is required`
                })
            }
        }

        // Cek apakah NIK sudah ada
        const existingVoter = await client.execute({
            sql: "SELECT nik FROM voters WHERE nik = ?",
            args: [body.nik]
        })

        if (existingVoter.rows.length > 0) {
            throw createError({
                statusCode: 400,
                message: 'NIK sudah terdaftar dalam database'
            })
        }

        const { nik, nama, tps, umur, jenis_kelamin, kecamatan, desa, jenis_pemilih } = body

        const result = await client.execute({
            sql: "INSERT INTO voters (nik, nama, tps, umur, jenis_kelamin, kecamatan, desa, jenis_pemilih) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            args: [nik, nama, tps, umur, jenis_kelamin, kecamatan, desa, jenis_pemilih]
        })

        return {
            message: 'Data pemilih berhasil dimasukkan',
            success: true,
            data: result
        }
    } catch (error: any) {
        // Tangkap error dan kirim response yang sesuai
        if (error.statusCode === 400) {
            return {
                success: false,
                message: error.message
            }
        }
        
        return {
            success: false,
            message: 'Terjadi kesalahan saat menyimpan data'
        }
    }
})