import pool from '../config/db.js';

// Create a new journey
export const createJourney = async (req, res) => {
  const { title, description, user_id } = req.body; // user_id will come from the request body

  try {
    const client = await pool.connect();
    const query = 'INSERT INTO Goals (user_id, title, description, created_at, progress) VALUES ($1, $2, $3, NOW(), 0) RETURNING *';
    const result = await client.query(query, [user_id, title, description]);
    client.release();

    res.status(201).json({ journey: result.rows[0] });
  } catch (error) {
    console.error('Error in createJourney:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Get journeys for a specific user
export const getOwnJourneys = async (req, res) => {
  const user_id = req.query.user_id; // Get user_id from query parameters

  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM Goals WHERE user_id = $1';
    const result = await client.query(query, [user_id]);
    client.release();

    res.status(200).json({ journeys: result.rows });
  } catch (error) {
    console.error('Error in getOwnJourneys:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

export const getJourneyById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Fetching goal with ID: ${id}`);

    const client = await pool.connect();
    const query = 'SELECT * FROM goals WHERE goal_id = $1';
    const result = await client.query(query, [id]);
    client.release();

    console.log('Query result:', result.rows);

    if (result.rows.length === 0) {
      console.log('No goal found with this ID');
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.status(200).json({ goal: result.rows[0] });
  } catch (error) {
    console.error('Error fetching goal by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a journey by ID
// Serveur : deleteJourney Controller
export const deleteJourney = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await pool.connect();
    const query = 'DELETE FROM Goals WHERE goal_id = $1 RETURNING *';
    const result = await client.query(query, [id]);
    client.release();

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Journey not found' });
    }

    // Retourner l'ID du journey supprimé
    res.status(200).json({ message: 'Journey deleted successfully', goal_id: id });
  } catch (error) {
    console.error('Error in deleteJourney:', error);
    res.status(500).json({ error: 'Database error' });
  }
};


