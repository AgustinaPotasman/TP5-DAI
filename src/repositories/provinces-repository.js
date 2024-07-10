import pkg from 'pg'
const { Client, Pool } = pkg;
import config from "../configs/db-config.js"

export default class ProvincesRepository {
    getAllAsync = async () => {
        const client = new Client(config);
        await client.connect();
        const sql = 'SELECT * from provinces'
        const result = await client.query(sql);  
        const EventsArray=result;  
        await client.end();
        return  ProvincesArray;
    }
    getByIdAsync = async (id) => {
        const query = ('SELECT * FROM provinces WHERE id = $1 ', [id]);
        const result = await client.query(query); 
        const ProvincesArray = result;  
        await client.end();
        return ProvincesArray;
    }
     createAsync= async(province)  =>{
        const { name, full_name, latitude, longitude, display_order } = province;
        const client = await config.connect();
        try {
            const result = await client.query('INSERT INTO public.provinces (name, full_name, latitude, longitude, display_order) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, full_name, latitude, longitude, display_order]);
            return result.rows[0];
        } finally {
            client.release();
        }
    }

     updateAsync = async (province) =>{
        const { id, name, full_name, latitude, longitude, display_order } = province;
        const client = await config.connect();
        try {
            const result = await client.query('UPDATE public.provinces SET name = $1, full_name = $2, latitude = $3, longitude = $4, display_order = $5 WHERE id = $6', [name, full_name, latitude, longitude, display_order, id]);
            return result;
        } finally {
            client.release();
        }
    }

    deleteAsync = async (id) => {
        const client = await config.connect();
        try {
            const result = await client.query('DELETE FROM public.provinces WHERE id = $1', [id]);
            return result;
        } finally {
            client.release();
        }
    }
}
 
