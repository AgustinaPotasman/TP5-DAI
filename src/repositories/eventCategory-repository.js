import config from '../configs/dbConfig.js'
import pkg from 'pg';
const { Client, Pool } = pkg;

export default class ECRepository{
    getAllAsync = async () => {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM event_categories');
        return res.rows;
    } catch (error) {
        console.error(error);
        return null;
    }
    }
 
    getByIdAsync = async (id) => {
        const client = await pool.connect()
        try {
            const res = await client.query('SELECT * FROM event_categories WHERE id = $1', [id]);
            return res.rows[0];
        } catch (error) {
            console.error(error);
            return null;
        }
        }

    createCategoryAsync = async (cat) => {
        const client = await pool.connect()
        try {
            const res = await client.query('INSERT INTO event_categories (name, display_order) VALUES ($1, $2)', [cat.name, cat.display_order]);
            return res.rows[0];
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    updateCategoryAsync = async (cat) => {
        const client = await pool.connect();
        try {
            const res = await client.query('UPDATE event_categories SET name = $1, display_order = $2 WHERE id = $3', [cat.name, cat.display_order, cat.id]);
            return res;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

}