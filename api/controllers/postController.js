import pool from '../config/db.js';




export const createPost = async (req, res) => {
  const { community_id, user_id, title, content } = req.body;
  const picture = req.file; // La photo est optionnelle

  console.log("Request body:", req.body); // Log des données envoyées par le client
  console.log("Uploaded file:", picture); // Log du fichier envoyé, si présent

  if (!community_id || !user_id || !title || !content) {
    return res.status(400).json({ error: "Community ID, User ID, title, and content are required" });
  }

  try {
    const client = await pool.connect();
    const query =
      "INSERT INTO Posts (community_id, user_id, title, content, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *";
    const result = await client.query(query, [community_id, user_id, title, content]);
    client.release();

    res.status(201).json({ post: result.rows[0] });
  } catch (error) {
    console.error("Error in createPost:", error);
    res.status(500).json({ error: "Database error" });
  }
};


export const deletePost = async (req, res) => {
  const { id: postId } = req.params; 

  if (!postId) {
    return res.status(400).json({ error: "Post ID is required" });
  }

  try {
    const client = await pool.connect();
    
    // Check if the post exists
    const checkQuery = "SELECT * FROM Posts WHERE id = $1";
    const checkResult = await client.query(checkQuery, [postId]);

    if (checkResult.rowCount === 0) {
      client.release();
      return res.status(404).json({ error: "Post not found" });
    }

    // Delete the post
    const deleteQuery = "DELETE FROM Posts WHERE id = $1";
    await client.query(deleteQuery, [postId]);
    client.release();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error in deletePost:", error);
    res.status(500).json({ error: "Database error" });
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

// Obtenir tous les posts de toutes les communautés
export const getPosts = async (req, res) => {
  try {
    const client = await pool.connect();
    // Requête pour récupérer tous les posts triés par date de création (du plus récent au plus ancien)
    const query = 'SELECT * FROM Posts ORDER BY created_at DESC';
    const result = await client.query(query);
    client.release();

    // Retourne les posts sous forme de JSON
    res.status(200).json({ posts: result.rows });
  } catch (error) {
    console.error('Error fetching all posts:', error);
    res.status(500).json({ error: 'Database error' });
  }
};


// Obtenir tous les posts d'un utilisateur spécifique
export const getPostsByUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM Posts WHERE user_id = $1 ORDER BY created_at DESC';
    const result = await client.query(query, [user_id]);
    client.release();

    // Retourner les posts de l'utilisateur
    res.status(200).json({ posts: result.rows });
  } catch (error) {
    console.error('Error fetching posts by user:', error);
    res.status(500).json({ error: 'Database error' });
  }
};


export const getPostById = async (req, res) => {
  const { id } = req.params;
  const postId = parseInt(id, 10); // Convertir en entier

  console.log('Requested Post ID:', postId);

  try {
    const client = await pool.connect();
    const postQuery = 'SELECT * FROM Posts WHERE id = $1';
    const postResult = await client.query(postQuery, [postId]);

    console.log('Post query result:', postResult.rows);

    if (postResult.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    client.release();
    res.status(200).json({ post: postResult.rows[0] });
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    res.status(500).json({ error: 'Database error' });
  }
};


