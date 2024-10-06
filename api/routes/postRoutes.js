import express from 'express';
import { createPost, getPostsByCommunity, getPosts, getPostsByUser, getPostById  } from '../controllers/postController.js';

const router = express.Router();

router.post('/', createPost);
router.get('/', getPosts);
router.get('/user/:user_id', getPostsByUser); 
router.get('/community/:community_id', getPostsByCommunity);
router.get('/post/:id', getPostById);

export default router;
