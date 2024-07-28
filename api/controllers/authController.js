import pool from '../config/db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM users WHERE (email = $1 OR username = $1) AND password = $2';
    const result = await client.query(query, [identifier, password]);
    client.release();

    if (result.rows.length === 1) {
      const user = result.rows[0];
      const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token, user: { id: user.user_id, email: user.email, username: user.username } });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error in authController login:', error);
    res.status(500).json({ error: 'Database error' });
  }
};


