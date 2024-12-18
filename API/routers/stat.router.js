import express from 'express';
import * as Stat from '../controllers/stat.controller.js';

const router = express.Router();

router.get('/stats', Stat.getStats);
router.get('/stats/:id', Stat.getStatById);
router.post('/stats', Stat.createStat);
router.put('/stats/:id', Stat.updateStat);
// router.delete('/stats/:id', Stat.deleteStatsById);

export default router;