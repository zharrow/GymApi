import express from 'express';
import { getEnterprises, getEnterpriseById, deleteEnterpriseById, createEnterprise, updateEnterprise } from '../controllers/enterprise.controller.js';

const router = express.Router();

router.get('/enterprises', getEnterprises);
router.get('/enterprises/:id', getEnterpriseById);
router.post('/enterprises', createEnterprise);
router.put('/enterprises/:id', updateEnterprise);
router.delete('/enterprises/:id', deleteEnterpriseById);


export default router;
