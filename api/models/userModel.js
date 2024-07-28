import pool from '../config/db.js';

export const findUserByUsernameAndPassword = async (username, password) => {
  const client = await pool.connect();
  const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
  const result = await client.query(query, [username, password]);
  client.release();
  return result.rows[0];
};
