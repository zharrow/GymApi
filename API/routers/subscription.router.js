import express from 'express';
import * as Subscription from '../controllers/subscription.controller.js';

const router = express.Router();

router.get('/subscriptions', Subscription.getSubscriptions);
// router.get('/subscriptions/:id', getSubscriptionsById);
router.post('/subscriptions', Subscription.createSubscription);
router.put('/subscriptions/:id', Subscription.updateSubscription);
// router.delete('/subscriptions/:id', deleteSubscriptionsById);

export default router;