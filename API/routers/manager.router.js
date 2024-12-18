import express from 'express';
import * as Manager from '../controllers/manager.controller.js';

const router = express.Router();

router.get('/managers', Manager.getManagers);
router.get('/managers/:id', Manager.getManagersById);
router.post('/managers', Manager.createManager);
router.put('/managers/:id', Manager.updateManager);
router.delete('/managers/:id', Manager.deleteManagersById);

export default router;