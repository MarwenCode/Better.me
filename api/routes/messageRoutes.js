import express from 'express';
import { sendMessage, getMessages } from '../controllers/messageController.js';

const router = express.Router();

// Route pour envoyer un message
router.post('/', sendMessage);

// Optionnel : Route pour récupérer les messages d'un utilisateur
router.get('/:userId', getMessages);

export default router;
