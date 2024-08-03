import pool from '../config/db.js';




export const createPost = async (req, res) => {
  const { community_id, user_id, title, content } = req.body;
  const picture = req.file; // La photo est optionnelle

  console.log('Request body:', req.body); // Affichez les données reçues pour débogage
  console.log('Uploaded file:', picture); // Affichez les fichiers reçus pour débogage

  if (!community_id || !user_id || !title || !content) {
    return res.status(400).json({ error: 'Community ID, User ID, title, and content are required' });
  }

  try {
    const client = await pool.connect();
    const query = 'INSERT INTO Posts (community_id, user_id, title, content, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *';
    const result = await client.query(query, [community_id, user_id, title, content]);
    client.release();

    res.status(201).json({ post: result.rows[0] });
  } catch (error) {
    console.error('Error in createPost:', error);
    res.status(500).json({ error: 'Database error' });
  }
};





// Obtenir tous les posts d'une communauté
export const getPostsByCommunity = async (req, res) => {
  const { community_id } = req.params;

  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM Posts WHERE community_id = $1';
    const result = await client.query(query, [community_id]);
    client.release();

    res.status(200).json({ posts: result.rows });
  } catch (error) {
    console.error('Error fetching posts by community:', error);
    res.status(500).json({ error: 'Database error' });
  }
};
