import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';

dotenv.config();

const poolConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

console.log('Pool config:', poolConfig);

const pool = new Pool(poolConfig);

pool.connect()
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Database connection error', err.stack));

export default pool;

