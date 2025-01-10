import express from 'express';
import {
    getEnterprises,
    getEnterpriseById,
    createEnterprise,
    updateEnterprise,
    deleteEnterpriseById,
    getEnterpriseStatistics,
    getGymsByEnterprises,
    toggleEnterprisesStatus,
    getGlobalStats,
    getEnterpriseTurnover,
    getGymAttendance
} from '../controllers/enterprise.controller.js';

const router = express.Router();

router.get('/enterprises/', getEnterprises);
router.get('/enterprises/:id', getEnterpriseById);
router.post('/enterprises/', createEnterprise);
router.put('/enterprises/:id', updateEnterprise);
router.delete('/enterprises/:id', deleteEnterpriseById);
router.get('/enterprises/:enterpriseId/stats', getEnterpriseStatistics);
router.get('/enterprises/:enterpriseId/gyms', getGymsByEnterprises);
router.put('/enterprises/:id/status', toggleEnterprisesStatus);
router.get('/enterprises/global-stats', getGlobalStats);
router.get('/enterprises/:enterpriseId/turnover', getEnterpriseTurnover);
router.get('/enterprises/:gymId/attendance', getGymAttendance);


export default router;