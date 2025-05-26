import express from 'express';
import { 
  getProducts, 
  getCustomers, 
  getRentals, 
  getProductById,
  getCustomerById,
  getRentalById
} from '../controllers/dataController.js';

const router = express.Router();

// Product routes
router.get('/products', getProducts);
router.get('/products/:id', getProductById);

// Customer routes
router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomerById);

// Rental routes
router.get('/rentals', getRentals);
router.get('/rentals/:id', getRentalById);

export default router;