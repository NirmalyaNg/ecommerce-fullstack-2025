import axios, { AxiosError } from 'axios';
import { Product } from '@/models/product';

type ProductResponse = {
  success: boolean;
  message?: string;
  error?: string;
  data?: {
    product?: Product;
    products?: Product[];
    total?: number;
    page?: number;
    pages?: number;
  };
};

export type ProductAdd = {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  slug: string;
  inStock: boolean;
  createdAt?: string;
  updatedAt?: string;
};

const handleProductError = (error: unknown): ProductResponse => {
  const axiosError = error as AxiosError<{ error: string }>;
  return {
    success: false,
    error: axiosError?.response?.data?.error ?? 'Something went wrong',
  };
};

// Add Product
export const addProduct = async (
  productData: Partial<ProductAdd>
): Promise<ProductResponse> => {
  try {
    const res = await axios.post('http://localhost:8000/api/product', productData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return handleProductError(error);
  }
};

// Get Product by Slug
export const getProductBySlug = async (slug: string): Promise<ProductResponse> => {
  try {
    const res = await axios.get(`http://localhost:8000/api/product/${slug}`);
    return res.data;
  } catch (error) {
    return handleProductError(error);
  }
};

// Update Product
export const updateProduct = async (
  id: string,
  updates: Partial<ProductAdd>
): Promise<ProductResponse> => {
  try {
    const res = await axios.put(`http://localhost:8000/api/product/${id}`, updates, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return handleProductError(error);
  }
};

// Delete Product
export const deleteProduct = async (id: string): Promise<ProductResponse> => {
  try {
    const res = await axios.delete(`http://localhost:8000/api/product/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return handleProductError(error);
  }
};
