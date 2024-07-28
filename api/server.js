import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import journeyRoutes from './routes/journeyRoutes.js';
import communityRoutes from "./routes/communityRoutes.js"


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

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
