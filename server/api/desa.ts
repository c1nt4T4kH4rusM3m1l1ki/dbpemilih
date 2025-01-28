// api/desa.get.ts
import { client } from '../utils/db'

export default defineEventHandler(async (e) => {
  try {
    const query = getQuery(e)
    const sql = `
      SELECT d.id_desa, d.nama_desa, k.nama_kecamatan 
      FROM desa d
      INNER JOIN kecamatan k ON d.id_kecamatan = k.id_kecamatan
      ${query.id_kecamatan ? 'WHERE d.id_kecamatan = ?' : ''}
    `
    
    const result = await client.execute({
      sql,
      args: query.id_kecamatan ? [Number(query.id_kecamatan)] : []
    })
    
    return result.rows
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Data desa gagal diproses"
    })
  }
})