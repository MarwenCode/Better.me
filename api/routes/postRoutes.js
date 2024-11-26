// //postRoutes.js
// import express from 'express';
// import { createPost, getPostsByCommunity, getPosts, getPostsByUser, getPostById  } from '../controllers/postController.js';

// const router = express.Router();

// router.post('/', createPost);
// router.get('/', getPosts);
// router.get('/user/:user_id', getPostsByUser); 
// router.get('/community/:community_id', getPostsByCommunity);
// router.get('/post/:id', getPostById);

// export default router;


import express from "express";
import multer from "multer";
import {
  createPost,
  getPostsByCommunity,
  getPosts,
  getPostsByUser,
  getPostById,
} from "../controllers/postController.js";

const router = express.Router();

// Configuration de multer pour gérer les fichiers
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes pour les posts
router.post("/", upload.single("picture"), createPost); // Route pour créer un post avec option d'image
router.get("/", getPosts); // Route pour récupérer tous les posts
router.get("/user/:user_id", getPostsByUser); // Route pour récupérer les posts d'un utilisateur
router.get("/community/:community_id", getPostsByCommunity); // Route pour récupérer les posts d'une communauté
router.get("/post/:id", getPostById); // Route pour récupérer un post spécifique

export default router;
