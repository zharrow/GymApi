import express from 'express';
import { getGyms, getGymById, deleteGymById, createGym, updateGym, turnover } from '../controllers/gym.controller.js';

const router = express.Router();

router.get('/gyms', getGyms);
router.get('/gyms/:id', getGymById);
router.post('/gyms', createGym);
router.put('/gyms/:id', updateGym);
router.delete('/gyms/:id', deleteGymById);
router.get('/gyms/:id/turnover', turnover);

export default router;  