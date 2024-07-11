import config from "../configs/db-config.js";
import pkg from "pg";
const { Pool } = pkg;

export default class EventLocationRepository {
    constructor() {
        this.pool = new Pool(config);
    }

    async getAllEventLocations() {
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

    async getEventLocationById(id) {
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
