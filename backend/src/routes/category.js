import express from 'express';
import {
  handleCategoryAdd,
  handleCategoryUpdate,
  handleCategoryDelete,
  handleGetAllCategories,
  handleGetCategoryById,
} from '../controllers/category.js';
import { checkAdmin, checkAuth } from '../middlewares/auth.js';

const router = express.Router();

// Create Category (Admin only)
router.post('/', checkAuth, checkAdmin, handleCategoryAdd);

// Get All Categories (Public)
router.get('/', handleGetAllCategories);

// Get Single Category by ID (Public)
router.get('/:id', handleGetCategoryById);

// Update Category by ID (Admin only)
router.put('/:id', checkAuth, checkAdmin, handleCategoryUpdate);

// Delete Category by ID (Admin only)
router.delete('/:id', checkAuth, checkAdmin, handleCategoryDelete);

export default router;
