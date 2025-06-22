import Order from '../models/order.js';

// Create Order
export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, shippingAddress, paymentMethod, totalAmount } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ success: false, error: 'No items in the order' });
    }

    const order = new Order({
      user: userId,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
    });

    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: savedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create order',
    });
  }
};

// Get my orders
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch orders',
    });
  }
};

// Get all orders (Admin only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email') // Optional: include user info
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch all orders',
    });
  }
};
