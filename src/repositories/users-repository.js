import config from "../configs/db-config.js";
import pkg from "pg";
const { Pool } = pkg;

export default class UserRepository {
    constructor() {
        this.pool = new Pool(config);
    }

    async login(username, password) {
        const client = await this.pool.connect();
        try {
            const rta = await client.query(
                `SELECT * FROM users WHERE username = $1 AND password = $2`, 
                [username, password]
            );
            console.log(rta)
            return rta.rows[0];
        } catch (error) {
            console.error(error);
        } 
    }

        /*const findUserByUsername = async (username) => {
        const result = await pool.query('SELECT * FROM public.users WHERE username = $1', [username]);
        return result.rows[0];
        };

        module.exports = {
        findUserByUsername,
        };*/ 

        async crearUser(first_name, last_name, username, password) {
            const client = await this.pool.connect();
            try {
                await client.query(
                    `INSERT INTO users (first_name, last_name, username , password) VALUES ($1, $2, $3, $4)`,
                    [first_name, last_name, username, password]
                );
                return true;
            } catch (error) {
                console.error(error);
                return false;
            } finally {
                client.release();
            }
        }
    }

