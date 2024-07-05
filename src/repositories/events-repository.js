import pkg from 'pg'
import DBConfig from "../configs/db-config.js"
import pool from "../configs/db-config.js";
const { Client, Pool } = pkg;
export default class EventRepository {
    searchEvents = async (filters) => {
    const client = await pool.connect();
    const { name, category, startdate, tag, limit, offset } = filters;
    const conditions = [];
    const values = [];

    if (name) {
        values.push(`%${name}%`);
        conditions.push(`e.name ILIKE $${values.length}`);
    }
    if (category) {
        values.push(`%${category}%`);
        conditions.push(`c.name ILIKE $${values.length}`);
    }
    if (startdate) {
        values.push(startdate);
        conditions.push(`DATE(e.start_date) = $${values.length}`);
        console.log(values.length);
    }
    if (tag) {
        values.push(`%${tag}%`);
        conditions.push(`t.name ILIKE $${values.length}`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const query = `
        SELECT 
            e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, el.max_capacity,
            u.id as creator_user_id, u.first_name as creator_user_first_name, u.last_name as creator_user_last_name, u.username as creator_user_username,
            c.id as category_id, c.name as category_name,
            el.id as location_id, el.name as location_name, el.full_address as location_full_address
        FROM events e
        JOIN users u ON e.id_creator_user = u.id
        JOIN event_categories c ON e.id_event_category = c.id
        JOIN event_locations el ON e.id_event_location = el.id
        LEFT JOIN event_tags et ON e.id = et.id_event
        LEFT JOIN tags t ON et.id_tag = t.id
        ${whereClause}
        ORDER BY e.start_date DESC
        LIMIT $${values.length + 1} OFFSET $${values.length + 2}
    `;
    values.push(limit, offset);

    try {
        const res = await client.query(query, values);

        const countQuery = `
            SELECT COUNT(*)
            FROM events e
            JOIN event_categories c ON e.id_event_category = c.id
            LEFT JOIN event_tags et ON e.id = et.id_event
            LEFT JOIN tags t ON et.id_tag = t.id
            ${whereClause}
        `;
        const countRes = await client.query(countQuery, values.slice(0, values.length - 2));
        const total = parseInt(countRes.rows[0].count, 10);

        return {
            events: res.rows,
            total
        };
    } finally {
        client.release();
    }
};


    getByIdAsync = async (id) => {
        const query = `
          SELECT 
            e.id, e.name, e.description, e.startdate,
            l.name as locations, 
            p.name as provinces
          FROM  events  e
          JOIN locations l ON e.id_location = l.id
          JOIN provinces p ON l.id_province = p.id
          WHERE e.id=${id}
        `;
        const values = [id];
        console.log(id);
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