import axios, { AxiosError } from 'axios';
import { Product } from '@/models/product'; // adjust path if needed

type ProductResponse = {
  success: boolean;
  error?: string;
  data?: {
    products: Product[];
    total: number;
    page: number;
    pages: number;
  };
};

// Fetch all products with optional search and pagination
export const fetchProducts = async (
  search = '',
  page = 1,
  limit = 5
): Promise<ProductResponse> => {
  try {
    const response = await axios.get('http://localhost:8000/api/product', {
      params: { search, page, limit },
    });
    return response.data;
  } catch (error: unknown) {
    return handleProductError(error);
  }
};

// Fetch single product by ID
export const fetchProductById = async (slug: string): Promise<ProductResponse> => {
  try {
    const response = await axios.get(`http://localhost:8000/api/product/${slug}`);
    return {
      success: true,
      data: {
        products: [response.data.data.product],
        total: 1,
        page: 1,
        pages: 1,
      },
    };
  } catch (error: unknown) {
    return handleProductError(error);
  }
};

const handleProductError = (error: unknown): ProductResponse => {
  const axiosError = error as AxiosError<{ error: string }>;
  return {
    success: false,
    error: axiosError?.response?.data?.error ?? 'Failed to fetch products',
  };
};
