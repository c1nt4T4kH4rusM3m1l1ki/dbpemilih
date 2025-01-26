import { client } from "../../utils/db"

export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, 'id')
        
        if (!id) {
            throw createError({
                statusCode: 400,
                message: 'ID kecamatan harus disertakan'
            })
        }

        const result = await client.execute({
            sql: 'SELECT nama_kecamatan FROM kecamatan WHERE id_kecamatan = ?',
            args: [id]
        })

        if (result.rows.length === 0) {
            throw createError({
                statusCode: 404,
                message: 'Kecamatan tidak ditemukan'
            })
        }

        return {
            success: true,
            data: result.rows[0]
        }
    } catch (error) {
        if (error instanceof Error) {
            throw createError({
                statusCode: 500,
                message: error.message || 'Terjadi kesalahan saat mencari kecamatan',
                data: error
            })
        }
        throw createError({
            statusCode: 500,
            message: 'Terjadi kesalahan saat mencari kecamatan'
        })
    }
})