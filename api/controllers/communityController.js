import pool from '../config/db.js';

// Créer une nouvelle communauté
export const createCommunity = async (req, res) => {
  const { title, description } = req.body;

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

// Obtenir une communauté par ID avec ses posts et commentaires
export const getCommunityById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();

    // Récupérer la communauté
    const communityQuery = 'SELECT * FROM Communities WHERE id = $1';
    const communityResult = await client.query(communityQuery, [id]);

    if (communityResult.rows.length === 0) {
      client.release();
      return res.status(404).json({ error: 'Community not found' });
    }

    const community = communityResult.rows[0];

    // Récupérer les posts de la communauté
    const postsQuery = 'SELECT * FROM Posts WHERE community_id = $1';
    const postsResult = await client.query(postsQuery, [id]);
    const posts = postsResult.rows;

    // Récupérer les commentaires pour chaque post
    const commentsQuery = 'SELECT * FROM Comments WHERE post_id = ANY($1::int[])';
    const postIds = posts.map(post => post.id);
    const commentsResult = await client.query(commentsQuery, [postIds]);
    const comments = commentsResult.rows;

    // Associer les commentaires aux posts
    const postsWithComments = posts.map(post => ({
      ...post,
      comments: comments.filter(comment => comment.post_id === post.id)
    }));

    client.release();

    res.status(200).json({
      community: {
        ...community,
        posts: postsWithComments
      }
    });
  } catch (error) {
    console.error('Error fetching community by ID:', error);
    res.status(500).json({ error: 'Database error' });
  }
};



// Supprimer une communauté par ID
export const deleteCommunityById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();

    // Vérifier si la communauté existe
    const communityQuery = 'SELECT * FROM Communities WHERE id = $1';
    const communityResult = await client.query(communityQuery, [id]);

    if (communityResult.rows.length === 0) {
      client.release();
      return res.status(404).json({ error: 'Community not found' });
    }

    // Supprimer la communauté
    const deleteQuery = 'DELETE FROM Communities WHERE id = $1';
    await client.query(deleteQuery, [id]);
    client.release();

    res.status(200).json({ message: 'Community deleted successfully' });
  } catch (error) {
    console.error('Error deleting community by ID:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

