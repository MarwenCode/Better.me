import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import journeyRoutes from './routes/journeyRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import postRoutes from './routes/postRoutes.js';  // Import des routes des posts
import commentRoutes from './routes/commentRoutes.js';  // Import des routes des commentaires

dotenv.config();

const app = express(); // Initialize the express app

const port = process.env.PORT || 5000;

// Handle CORS issues
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/journeys', journeyRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/posts', postRoutes);  // Définir les routes pour les posts
app.use('/api/comments', commentRoutes);  // Définir les routes pour les commentaires

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
