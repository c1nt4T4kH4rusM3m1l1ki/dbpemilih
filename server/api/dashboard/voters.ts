import {client} from '../../utils/db'

export default defineEventHandler(async () => {
    try {
        const result = await client.execute(
            'SELECT * FROM voters'
        );
        return result.rows;
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Database Error'
        });
    }
}); 