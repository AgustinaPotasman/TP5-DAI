import pool from "../configs/db-config.js";
import pkg from 'pg';
import bcrypt from 'bcryptjs';
const { Client } = pkg;
export default class UserRepository {
    
    login = async (username, password) => {
        try {
            const client = await pool.connect(); 
            const sql = 'SELECT * FROM users WHERE username = $1';
            const result = await client.query(sql, [username]);
            const user = result.rows[0];
            if (user && await bcrypt.compare(password, user.password)) {
                return user;
              
            }
            else{
                 return null;
                 
            }
           
        } catch (error) {
            console.error('Error during login:', error);
            return null;
        }
    };

    crearUser = async (first_name, last_name, username, password) => {
        const client = await pool.connect();
        try {
            // Validar que todos los campos estén presentes
            if (!first_name || !last_name || !username || !password) {
                console.error('Faltan campos para registrar al usuario.');
                return false;
            }

            // Encriptar la contraseña antes de guardarla
            const hashedPassword = await bcrypt.hash(password, 10);

           
            await client.query(
                `INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)`,
                [first_name, last_name, username, hashedPassword] 
            );
            return true;
        } catch (error) {
            console.error('Error during user creation:', error);
            return false;
        } finally {
            client.release();
        }
    }
}
