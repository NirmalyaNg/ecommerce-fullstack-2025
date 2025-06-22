import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Check if logged in
export const checkAuth = async (req, res, next) => {
  const token = req?.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: No token provided',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded?._id);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: User not found',
      });
    }

    req.user = user; // attach user object to request
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Invalid or expired token',
    });
  }
};

// // Check if logged in as admin
export const checkAdmin = async (req, res, next) => {
  if (!req?.user?.isAdmin) {
    return res.status(403).json({
      success: false,
      error: 'Not allowed',
    });
  }
  next();
};
