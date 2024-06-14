import pkg from 'pg'
import DBConfig from "../configs/db-config.js"
const { Client, Pool } = pkg;
export default class EventRepository {
    getAllAsync = async () => {
        const client = new Client(DBConfig);
        await client.connect();
        const sql = 'SELECT * from events'
        const result = await client.query(sql);  
        const EventsArray=result;  
        await client.end();
        return  EventsArray;
    }
    getByParamsAsync = async (query) => {
        const cliente = new Cliente(config);
        await cliente.connect();
        let sql = `SELECT * FROM events 
        INNER JOIN event_categories ON events.id_event_category == event_categories.id 
        INNER JOIN event_tags ON events_tags.id_event == event.id 
        INNER JOIN tags ON tags.id = event_tags.id_tag `
        sql += query;
        const result = await cliente.query(sql);  
        const EventsArray = result;  
        await cliente.end();
        return EventsArray;
    }
    getByIdAsync = async (id) => {
        const query = `
          SELECT 
            e.Id, e.Nombre, e.Descripcion, e.Fecha,
            l.Nombre as Localidad, 
            p.Nombre as Provincia
          FROM public.Evento e
          JOIN public.Localidad l ON e.IdLocalidad = l.Id
          JOIN public.Provincia p ON l.IdProvincia = p.Id
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
       createEvent = async (eventData) => {
        const { name, description, max_assistance, max_capacity, price, duration_in_minutes, id_event_location, userId } = eventData;
        const client = await pool.connect();
        try {
            const res = await client.query(
                'INSERT INTO events (name, description, max_assistance, max_capacity, price, duration_in_minutes, id_event_location, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
                [name, description, max_assistance, max_capacity, price, duration_in_minutes, id_event_location, userId]
            );
            return res.rows[0];
        } finally {
            client.release();
        }
    };
}