import { client } from '../utils/db'

export default defineEventHandler(async (e) => {
    try {
        const query = getQuery(e) || {}
        
        // Query untuk data dengan pagination
        let sql = `
            SELECT 
                v.nik,
                v.nama,
                v.tps,
                v.umur,
                v.jenis_kelamin,
                v.kecamatan,
                v.desa,
                v.jenis_pemilih,
                v.created_at
            FROM voters v
            WHERE v.jenis_pemilih IN ('umum', 'Umum')
        `
        const params: any[] = []

        // Base WHERE clause untuk count
        let whereClause = `WHERE jenis_pemilih IN ('umum', 'Umum')`

        if (query.search) {
            sql += ' AND v.nama LIKE ?'
            whereClause += ' AND nama LIKE ?'
            params.push(`%${query.search}%`)
        }

        if (query.kecamatan) {
            sql += ' AND v.kecamatan = ?'
            whereClause += ' AND kecamatan = ?'
            params.push(query.kecamatan)
        }

        if (query.desa) {
            sql += ' AND v.desa = ?'
            whereClause += ' AND desa = ?'
            params.push(query.desa)
        }

        const limit = query.limit ? parseInt(query.limit as string) : 10
        const page = query.page ? parseInt(query.page as string) : 1
        const offset = (page - 1) * limit

        sql += ' LIMIT ? OFFSET ?'
        params.push(limit, offset)

        // Query terpisah untuk mengambil semua lokasi tanpa pagination
        const locationsSql = `
            SELECT DISTINCT kecamatan, desa 
            FROM voters 
            WHERE jenis_pemilih IN ('umum', 'Umum')
            ORDER BY kecamatan, desa
        `

        const [result, countResult, uniqueLocations] = await Promise.all([
            client.execute({
                sql,
                args: params
            }),
            client.execute({
                sql: `SELECT COUNT(*) as total FROM voters ${whereClause}`,
                args: params.slice(0, -2) // Hapus limit dan offset dari params
            }),
            client.execute({
                sql: locationsSql,
                args: []
            })
        ])

        const total = countResult.rows?.[0]?.total || 0

        return {
            data: result.rows || [],
            pagination: {
                total: parseInt(total.toString()),
                currentPage: page,
                totalPages: Math.ceil(parseInt(total.toString()) / limit),
                limit
            },
            locations: uniqueLocations.rows || []
        }
    } catch (error) {
        console.error('Error:', error)
        throw createError({
            statusCode: 500,
            message: (error as Error).message || "Error fetching voters data"
        })
    }
}) 