import pkg from 'pg'
const { Client, Pool } = pkg;
export default class ProvinceRepository {
    getAllAsync = async () => {
        const cliente = new Cliente(config);
        await cliente.connect();
        const sql = 'SELECT * from events'
        const result = await cliente.query(sql);  
        const EventsArray=result;  
        await cliente.end();
        return  EventsArray;
    }
    getByParamsAsync = async (query) => {
        const cliente = new Cliente(config);
        await cliente.connect();
        const sql = query;
        const result = await cliente.query(sql);  
        const EventsArray = result;  
        await cliente.end();
        return EventsArray;
    }
    getByIdAsync = async (id) => {
        const query = `
          SELECT 
            e."Id", e."Nombre", e."Descripcion", e."Fecha",
            l."Nombre" as "Localidad", 
            p."Nombre" as "Provincia"
          FROM public."Evento" e
          JOIN public."Localidad" l ON e."IdLocalidad" = l."Id"
          JOIN public."Provincia" p ON l."IdProvincia" = p."Id"
          WHERE e."Id" = $1
        `;
        const values = [id];
        try {
          const { rows } = await pool.query(query, values);
          return rows[0];
        } catch (error) {
          console.error('Error al obtener el evento:', error);
          throw error;
        }
      }
 
}