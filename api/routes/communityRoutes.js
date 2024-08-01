import express from 'express';
import {
  createCommunity,
  getAllCommunities,
  getCommunityById,
  deleteCommunityById
} from '../controllers/communityController.js';

const router = express.Router();

// Route pour obtenir toutes les communautés
router.get('/', getAllCommunities);

// Route pour obtenir une communauté par ID
router.get('/:id', getCommunityById);

// Route pour créer une nouvelle communauté
router.post('/', createCommunity);

router.delete('/:id', deleteCommunityById);

export default router;
