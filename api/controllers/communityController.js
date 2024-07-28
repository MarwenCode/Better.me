import pool from '../config/db.js';

// Créer une nouvelle communauté
export const createCommunity = async (req, res) => {
  const { title, description } = req.body; // title et description viendront du corps de la requête

  // Valider les données reçues
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const client = await pool.connect();
    const query = 'INSERT INTO Communities (title, description, created_at) VALUES ($1, $2, NOW()) RETURNING *';
    const result = await client.query(query, [title, description]);
    client.release();

    res.status(201).json({ community: result.rows[0] });
  } catch (error) {
    console.error('Error in createCommunity:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Obtenir toutes les communautés
export const getAllCommunities = async (req, res) => {
  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM Communities';
    const result = await client.query(query);
    client.release();

    res.status(200).json({ communities: result.rows });
  } catch (error) {
    console.error('Error fetching communities:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Obtenir une communauté par ID
export const getCommunityById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM Communities WHERE id = $1';
    const result = await client.query(query, [id]);
    client.release();

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Community not found' });
    }

    res.status(200).json({ community: result.rows[0] });
  } catch (error) {
    console.error('Error fetching community by ID:', error);
    res.status(500).json({ error: 'Database error' });
  }
};
