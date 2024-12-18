import express from 'express';
import { getGyms, getGymById, deleteGymById, createGym, updateGym } from '../controllers/gym.controller.js';

const router = express.Router();

router.get('/gyms', getGyms);
router.get('/gyms/:id', getGymById);
router.post('/gyms', createGym);
router.put('/gyms/:id', updateGym);
router.delete('/gyms/:id', deleteGymById);

export default router;  