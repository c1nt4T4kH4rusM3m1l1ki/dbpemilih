import {client} from '../utils/db'

export default defineEventHandler(async (e) => {
    try {
        const query = getQuery(e);
        const page = parseInt(query.page as string) || 1;
        const limit = parseInt(query.limit as string) || 15;
        const search = query.search as string || '';
        const offset = (page - 1) * limit;

        let sql = 'SELECT * FROM voters';
        let countSql = 'SELECT COUNT(*) as total FROM voters';
        let queryParams = [];

        if (search) {
            sql += ' WHERE nama LIKE ?';
            countSql += ' WHERE nama LIKE ?';
            queryParams.push(`%${search}%`);
        }

        // Get total count first
        const countResult = await client.execute({
            sql: countSql,
            args: queryParams
        });
        const total = parseInt(countResult.rows[0].total!.toString()) || 0;

        // Add pagination parameters
        sql += ' LIMIT ? OFFSET ?';
        queryParams.push(limit, offset);

        // Get paginated data
        const result = await client.execute({
            sql: sql,
            args: queryParams
        });
        
        return {
            data: result.rows,
            pagination: {
                total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                limit
            }
        };
    } catch (error) {
        console.error('Database Error:', error);
        throw createError({
            statusCode: 500,
            message: 'Database Error'
        });
    }
});
