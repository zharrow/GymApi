import express from 'express';
import * as UserBadgeController from '../controllers/userBadge.controller.js';

const router = express.Router();

router.get('/userBadges', UserBadgeController.getUserBadges);
// router.get('/userBadges/:id', getUserBadgesById);
router.post('/userBadges', UserBadgeController.createUserBadge);
// router.put('/userBadges/:id', updateUserBadge);
// router.delete('/userBadges/:id', deleteUserBadgesById);

export default router;