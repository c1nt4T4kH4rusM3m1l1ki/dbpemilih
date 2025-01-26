import {client} from '../utils/db'

export default defineEventHandler(async(e)=>{
    try{
        const desa = await client.execute("SELECT * FROM desa");
        return desa.rows
    }catch(error){
        throw createError({
            statusCode:500,
            message:"data desa gagal di proses"
        })
    }
})