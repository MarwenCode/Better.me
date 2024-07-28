import pool from '../config/db.js';

export const createJourney = async (userId, title, description) => {
  const client = await pool.connect();
  const query = 'INSERT INTO Goals (user_id, title, description) VALUES ($1, $2, $3) RETURNING *';
  const result = await client.query(query, [userId, title, description]);
  client.release();
  return result.rows[0];
};

export const getJourneysByUserId = async (userId) => {
  const client = await pool.connect();
  const query = 'SELECT * FROM Goals WHERE user_id = $1';
  const result = await client.query(query, [userId]);
  client.release();
  return result.rows;
};
