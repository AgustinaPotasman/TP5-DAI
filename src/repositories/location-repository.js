import config from "../configs/dbConfig.js";
import pkg from "pg";
const { Pool } = pkg;

export default class LocationRepository {
    constructor() {
        this.pool = new Pool(config);
    }

    async getAll() {
        const client = await this.pool.connect();
        try {
            const result = await client.query('SELECT * FROM locations');
            return result.rows;
        } catch (error) {
            console.error(error);
        } finally {
            client.release();
        }
    }

    async getById(id) {
        const client = await this.pool.connect();
        try {
            const result = await client.query('SELECT * FROM locations WHERE id = $1', [id]);
            return result.rows[0];
        } catch (error) {
            console.error(error);
        } finally {
            client.release();
        }
    }

    async getEventLocationsByLocationId(id) {
        const client = await this.pool.connect();
        try {
            const result = await client.query('SELECT * FROM event_locations WHERE location_id = $1', [id]);
            return result.rows;
        } catch (error) {
            console.error(error);
        } finally {
            client.release();
        }
    }
}
