import { client } from '~/server/utils/db';

export default defineEventHandler(async (event) => {
  const { nik } = getQuery(event);

  if (!nik) {
    throw createError({
      statusCode: 400,
      statusMessage: 'NIK diperlukan untuk menghapus data pemilih.',
    });
  }

  try {
    const result = await client.execute({
      sql: 'DELETE FROM voters WHERE nik = ?',
      args: [String(nik)],
    });

    if (result.rowsAffected === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Data pemilih tidak ditemukan.',
      });
    }

    return {
      statusCode: 200,
      statusMessage: 'Data pemilih berhasil dihapus.',
    };
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Terjadi kesalahan saat menghapus data pemilih.',
    });
  }
});
