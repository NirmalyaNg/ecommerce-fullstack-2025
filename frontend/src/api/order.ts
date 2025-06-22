import axios, { AxiosError } from 'axios';

type OrderItem = {
  product: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
};

export type Order = {
  _id: string;
  user: string;
  items: OrderItem[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone?: string;
    email?: string;
  };
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type OrderResponse = {
  success: boolean;
  message?: string;
  error?: string;
  data?: Order | Order[];
};

// Create a new order
export const createOrder = async (
  orderData: Omit<
    Order,
    '_id' | 'user' | 'createdAt' | 'updatedAt' | 'isDelivered' | 'paymentStatus'
  >
): Promise<OrderResponse> => {
  try {
    const response = await axios.post('http://localhost:8000/api/order', orderData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: unknown) {
    return handleOrderError(error);
  }
};

// Fetch all orders (admin)
// utils/fetchOrders.ts (or inline in your server component)
export const getAllOrders = async () => {
  const res = await fetch('http://localhost:8000/api/order', {
    credentials: 'include', // Include cookies
    cache: 'no-store',
    headers: {
      Cookie: '',
    },
  });

  return res.json();
};

// Fetch all orders for the logged-in user
export const getMyOrders = async (): Promise<OrderResponse> => {
  try {
    const response = await axios.get('http://localhost:8000/api/order', {
      withCredentials: true,
    });
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    return handleOrderError(error);
  }
};

const handleOrderError = (error: unknown): OrderResponse => {
  const axiosError = error as AxiosError<{ error: string }>;
  return {
    success: false,
    error: axiosError?.response?.data?.error ?? 'Something went wrong with your order request',
  };
};
