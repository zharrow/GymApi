import express from 'express';
import * as Badge from '../controllers/badge.controller.js';

const router = express.Router();

router.get('/badges', Badge.getBadges);
// router.get('/badges/:id', getBadgesById);
router.post('/badges', Badge.createBadge);
router.put('/badges/:id', Badge.updateBadge);
// router.delete('/badges/:id', deleteBadgesById);

export default router;