import express from 'express';
import {
  handleRegister,
  handleLogin,
  handleGetCurrentUser,
  handleLogout,
} from '../controllers/auth.js';

const router = express.Router();

// Register
router.post('/register', handleRegister);

// Login
router.post('/login', handleLogin);

// Validate
router.get('/me', handleGetCurrentUser);

// Logout
router.post('/logout', handleLogout);

export default router;
