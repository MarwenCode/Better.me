import pool from '../config/db.js';

// Créer un nouveau commentaire
export const createComment = async (req, res) => {
  const { post_id, user_id, content } = req.body;

  if (!post_id || !user_id || !content) {
    return res.status(400).json({ error: 'Post ID, User ID, and content are required' });
  }

  try {
    const client = await pool.connect();
    const query = 'INSERT INTO Comments (post_id, user_id, content, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *';
    const result = await client.query(query, [post_id, user_id, content]);
    client.release();

    res.status(201).json({ comment: result.rows[0] });
  } catch (error) {
    console.error('Error in createComment:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Obtenir tous les commentaires d'un post
export const getCommentsByPost = async (req, res) => {
  const { post_id } = req.params;

  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM Comments WHERE post_id = $1';
    const result = await client.query(query, [post_id]);
    client.release();

    res.status(200).json({ comments: result.rows });
  } catch (error) {
    console.error('Error fetching comments by post:', error);
    res.status(500).json({ error: 'Database error' });
  }
};
