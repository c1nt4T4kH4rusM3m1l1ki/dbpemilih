import { client } from "../utils/db";

export default defineEventHandler( async (e)=>{
    try{
        const kecamatan = await client.execute('SELECT * FROM kecamatan')
        return kecamatan.rows
    }catch(error){
        throw createError({
            statusCode:500,
            message:"data diminta salah"
        })
    }
})