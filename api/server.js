import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';  // Importation de multer

import authRoutes from './routes/authRoutes.js';
import journeyRoutes from './routes/journeyRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

// Configuration de dotenv
dotenv.config();

const app = express(); // Initialisation de l'application express

const port = process.env.PORT || 5000;

// Gestion des problèmes de CORS
app.use(cors());

// Configuration de multer
const upload = multer({ dest: 'uploads/' }); // Répertoire où les fichiers seront stockés

// Middleware pour parser les données JSON
app.use(bodyParser.json());

// Middleware pour parser les données url-encoded (si nécessaire)
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware pour gérer les données multipart/form-data
app.use('/api/posts', upload.single('picture'), (req, res, next) => {
  req.body.picture = req.file; // Associe le fichier téléchargé à req.body
  next();
});

// Définition des routes
app.use('/api/auth', authRoutes);
app.use('/api/journeys', journeyRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/posts', postRoutes); // Définir les routes pour les posts
app.use('/api/comments', commentRoutes); // Définir les routes pour les commentaires

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
