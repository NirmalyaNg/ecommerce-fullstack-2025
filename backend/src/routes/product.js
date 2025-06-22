import express from 'express';
import {
  handleProductAdd,
  handleProductDelete,
  handleGetProductById,
  handleGetAllProducts,
  handleProductUpdate,
} from '../controllers/product.js';

import { checkAuth, checkAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Add Product (Admin only)
router.post('/', checkAuth, checkAdmin, handleProductAdd);

// Get All Products (Public - with search + pagination)
router.get('/', handleGetAllProducts);

// Get Product by slug (Public)
router.get('/:slug', handleGetProductById);

// Update Product by ID (Admin only)
router.put('/:id', checkAuth, checkAdmin, handleProductUpdate);

// Delete Product by ID (Admin only)
router.delete('/:id', checkAuth, checkAdmin, handleProductDelete);

export default router;
