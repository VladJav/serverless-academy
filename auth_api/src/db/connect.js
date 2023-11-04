import pg from 'pg';

const Pool = pg.Pool;

export const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
});

export const connectDB = async () =>{
    await pool.query(`CREATE TABLE IF NOT EXISTS users(
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            email varchar(255) unique,
            password varchar(255))
        `);
    await pool.query(`CREATE TABLE IF NOT EXISTS tokens(
            id uuid PRIMARY KEY REFERENCES users (id),
            token varchar(255),
            userAgent varchar(255))
        `);
}



