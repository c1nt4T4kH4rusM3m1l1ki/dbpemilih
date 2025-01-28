import {client} from '../../utils/db'

export default defineEventHandler(async () => {
    try {
        const result = await client.execute({
            sql: 'SELECT * FROM voters ORDER BY created_at DESC',
            args: []
        });
        return result.rows;
    } catch (error) {
        console.error('Error:', error);
        throw createError({
            statusCode: 500,
            message: 'Database Error'
        });
    }
}); 