// src/controllers/stepController.js

import pool from '../config/db.js';

// Get steps for a specific journey
export const getSteps = async (req, res) => {
  const { goal_id } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM Steps WHERE goal_id = $1', [goal_id]);
    client.release();
    res.status(200).json({ steps: result.rows });
  } catch (error) {
    console.error('Error fetching steps:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add a new step
export const addStep = async (req, res) => {
  const { goal_id, description } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO Steps (goal_id, description, completed) VALUES ($1, $2, false) RETURNING *', [goal_id, description]);
    client.release();
    res.status(201).json({ step: result.rows[0] });
  } catch (error) {
    console.error('Error adding step:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Other step functions (updateStep, deleteStep) as needed
