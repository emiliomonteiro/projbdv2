import express from 'express';
import {
  getDimensionalData,
  performDrillDown,
  performRollUp,
  getCustomerClusters,
  getSalesPrediction
} from '../controllers/analyticsController.js';

const router = express.Router();

// OLAP operations
router.get('/dimensional-data', getDimensionalData);
router.get('/drill-down', performDrillDown);
router.get('/roll-up', performRollUp);

// Data mining
router.get('/customer-clusters', getCustomerClusters);
router.get('/sales-prediction', getSalesPrediction);

export default router;