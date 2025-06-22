import express from 'express';
import { checkAdmin, checkAuth } from '../middlewares/auth.js';
import { createOrder, getAllOrders, getUserOrders } from '../controllers/order.js';

const router = express.Router();

// Create a new order
router.post('/', checkAuth, createOrder);

// Get all orders for the logged-in user
router.get('/', checkAuth, getUserOrders);

// Get all order for all users
router.get('/', checkAuth, checkAdmin, getAllOrders);

export default router;
