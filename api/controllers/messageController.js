import pool from '../config/db.js';

export const sendMessage = async (req, res) => {
  const { sender_id, receiver_id, content } = req.body;

  try {
    // Insérer le message dans la base de données
    const client = await pool.connect();
    const query = `
      INSERT INTO messages (sender_id, receiver_id, content, created_at)
      VALUES ($1, $2, $3, NOW()) RETURNING *`;
    const result = await client.query(query, [sender_id, receiver_id, content]);
    client.release();

    // Renvoyer le message comme réponse (inclut les données à afficher)
    res.status(201).json({ message: result.rows[0] });
  } catch (error) {
    console.error('Error in sendMessage:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Optionnel : Contrôleur pour récupérer les messages d'un utilisateur
export const getMessages = async (req, res) => {
  const { userId } = req.params;

  try {
    const client = await pool.connect();
    const query = `
      SELECT * FROM messages
      WHERE sender_id = $1 OR receiver_id = $1
      ORDER BY created_at ASC`;
    const result = await client.query(query, [userId]);
    client.release();

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error in getMessages:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

