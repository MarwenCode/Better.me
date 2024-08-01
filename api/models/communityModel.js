import pool from '../config/db.js';

// Créer une nouvelle communauté
export const createCommunity = async (title, description) => {
  const client = await pool.connect();
  const query = 'INSERT INTO Communities (title, description, created_at) VALUES ($1, $2, NOW()) RETURNING *';
  try {
    const result = await client.query(query, [title, description]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

// Obtenir toutes les communautés
export const getAllCommunities = async () => {
  const client = await pool.connect();
  const query = 'SELECT * FROM Communities';
  try {
    const result = await client.query(query);
    return result.rows;
  } finally {
    client.release();
  }
};

// Obtenir une communauté par ID
export const getCommunityById = async (id) => {
  const client = await pool.connect();
  const query = 'SELECT * FROM Communities WHERE id = $1';
  try {
    const result = await client.query(query, [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

// Créer un post
export const createPost = async (community_id, user_id, title, content) => {
  const client = await pool.connect();
  const query = 'INSERT INTO Posts (community_id, user_id, title, content, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *';
  try {
    const result = await client.query(query, [community_id, user_id, title, content]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

// Créer un commentaire
export const createComment = async (post_id, user_id, content) => {
  const client = await pool.connect();
  const query = 'INSERT INTO Comments (post_id, user_id, content, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *';
  try {
    const result = await client.query(query, [post_id, user_id, content]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

// Obtenir les posts d'une communauté
export const getPostsByCommunityId = async (community_id) => {
  const client = await pool.connect();
  const query = 'SELECT * FROM Posts WHERE community_id = $1';
  try {
    const result = await client.query(query, [community_id]);
    return result.rows;
  } finally {
    client.release();
  }
};

// Obtenir les commentaires d'un post
export const getCommentsByPostId = async (post_id) => {
  const client = await pool.connect();
  const query = 'SELECT * FROM Comments WHERE post_id = $1';
  try {
    const result = await client.query(query, [post_id]);
    return result.rows;
  } finally {
    client.release();
  }
};
