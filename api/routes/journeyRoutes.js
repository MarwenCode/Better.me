import express from 'express';
import { createJourney, getOwnJourneys, getJourneyById, deleteJourney } from '../controllers/journeyController.js';
import { addStep, getSteps } from '../controllers/stepController.js';

const router = express.Router();

router.post('/', createJourney); // Endpoint to create a journey
router.get('/own', getOwnJourneys); // Endpoint to get journeys for a specific user
router.get('/:id', getJourneyById); // Endpoint to get journey details by ID

// Step routes
router.post('/steps', addStep); // Endpoint to add a step
router.get('/steps/:goal_id', getSteps); // Endpoint to get steps for a specific journey

router.delete('/:id', deleteJourney);


export default router;


