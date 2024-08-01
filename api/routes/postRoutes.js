import express from 'express';
import { createPost, getPostsByCommunity } from '../controllers/postController.js';

const router = express.Router();

router.post('/', createPost);
router.get('/community/:community_id', getPostsByCommunity);

export default router;
