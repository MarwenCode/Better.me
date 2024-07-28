import express from 'express';
import { createCommunity, getAllCommunities, getCommunityById } from '../controllers/communityController.js';

const router = express.Router();

// Créer une nouvelle communauté
router.post('/', createCommunity);

// Obtenir toutes les communautés
router.get('/', getAllCommunities);

// Obtenir une communauté par ID
router.get('/:id', getCommunityById);

export default router;
