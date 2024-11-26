import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import http from 'http';
import { Server } from 'socket.io'; // Importation de socket.io

import authRoutes from './routes/authRoutes.js';
import journeyRoutes from './routes/journeyRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import messageRoutes from './routes/messageRoutes.js'


dotenv.config();

const app = express();
const server = http.createServer(app); // Créer un serveur HTTP
const io = new Server(server, { cors: { origin: '*' } }); // Initialisation de Socket.IO

const port = process.env.PORT || 5000;

// Gestion des problèmes de CORS
app.use(cors());

// Middleware pour parser les données JSON
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/journeys', journeyRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/messages', messageRoutes); // Définir les routes pour les messages

// Gestion de Socket.IO
io.on('connection', (socket) => {
  console.log('a user connected');

  // Lorsqu'un utilisateur envoie un message
  socket.on('send_message', async (message) => {
    try {
      const { sender_id, receiver_id, content } = message;

      // Enregistrez le message dans la base de données
      const client = await pool.connect();
      const query = `
        INSERT INTO messages (sender_id, receiver_id, content, created_at)
        VALUES ($1, $2, $3, NOW()) RETURNING *`;
      const result = await client.query(query, [sender_id, receiver_id, content]);
      client.release();

      // Émettre le message au destinataire
      io.to(receiver_id).emit('receive_message', result.rows[0]);

      // Optionnel : Vous pouvez aussi renvoyer la réponse à l'expéditeur
      socket.emit('message_sent', result.rows[0]);

    } catch (error) {
      console.error('Error in send_message via socket:', error);
    }
  });

  // Gérer la déconnexion de l'utilisateur
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Démarrer le serveur
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
