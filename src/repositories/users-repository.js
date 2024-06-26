
import pkg from 'pg'
const { Client, Pool } = pkg;
export const getUserByUsername = async (username, password) => {
    let respuesta = null;
    const client = await config.connect();
    try {
        const res = await client.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
        if (res.rows.length > 0 ){
            respuesta = res.rows[0];
        }
    } finally {
        client.release();
    }
    return respuesta;
};
export const createUser = async (userData) => {
    const client = await config.connect();
    try {
        const res = await client.query(
            'INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [userData.first_name, userData.last_name, userData.username, userData.password]
        );
        console.log('Nuevo User:', res.rows[0]);
        return res.rows[0];
    } finally {
        client.release();
    }
};