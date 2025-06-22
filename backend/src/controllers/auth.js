import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register Handler
export const handleRegister = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, dob, gender } = req?.body ?? {};
  const requiredFields = {
    firstName,
    lastName,
    email,
    gender,
    password,
    phoneNumber,
    dob,
  };
  // Check for missing fields
  const missingFields = Object.entries(requiredFields)
    ?.filter(([_, value]) => !value)
    ?.map(([key]) => key);
  if (missingFields?.length >= 1) {
    return res.status(400).json({
      success: false,
      error: `Missing fields: ${missingFields?.join(', ')}`,
    });
  }
  try {
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create and save user document
    const user = new User({
      ...requiredFields,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Registration successfull',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error?.message ?? 'Invalid user data',
    });
  }
};

// Login
export const handleLogin = async (req, res) => {
  const { email, password } = req?.body ?? {};
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email and/or password is missing',
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Credentials',
      });
    }
    // Match Password
    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Credentials',
      });
    }
    // Generate token
    const token = jwt.sign(
      { _id: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );
    // Send token as http only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isAdmin: user.isAdmin,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error?.message ?? 'Something went wrong',
    });
  }
};

// Get Current User
export const handleGetCurrentUser = async (req, res) => {
  const token = req?.cookies?.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded?._id }).select(
      'firstName lastName _id email isAdmin phoneNumber'
    );
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User not found',
      });
    }
    return res.json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
    });
  }
};

// Logout
export const handleLogout = (_, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'Strict', // Match your login cookie settings
      secure: process.env.NODE_ENV === 'production',
    });

    return res.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch {
    res.status(500).json({
      success: false,
      error: error?.message ?? 'Something went wrong',
    });
  }
};
