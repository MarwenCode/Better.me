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



// Update a step description
export const updateStepDescription = async (req, res) => {
  const { step_id } = req.params;
  const { description } = req.body;
  try {
    const client = await pool.connect();
    await client.query('UPDATE Steps SET description = $1 WHERE step_id = $2', [description, step_id]);
    client.release();
    res.status(200).json({ message: 'Step updated successfully' });
  } catch (error) {
    console.error('Error updating step:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a step
export const deleteStep = async (req, res) => {
  const { step_id, goal_id } = req.params;
  try {
    const client = await pool.connect();

    // Delete the step
    await client.query('DELETE FROM Steps WHERE step_id = $1', [step_id]);

    // Recalculate the progress after deletion
    const stepCount = await client.query('SELECT COUNT(*) FROM Steps WHERE goal_id = $1', [goal_id]);
    const completedStepCount = await client.query('SELECT COUNT(*) FROM Steps WHERE goal_id = $1 AND completed = true', [goal_id]);

    const totalSteps = parseInt(stepCount.rows[0].count, 10);
    const completedSteps = parseInt(completedStepCount.rows[0].count, 10);

    const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

    // Update the progress in the Goals table
    await client.query('UPDATE Goals SET progress = $1 WHERE goal_id = $2', [progress, goal_id]);

    client.release();

    res.status(200).json({ message: 'Step deleted successfully', progress });
  } catch (error) {
    console.error('Error deleting step:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

