import axios, { AxiosError } from 'axios';
import { Category } from '@/models/category';

type CategoryResponse = {
  success: boolean;
  message?: string;
  error?: string;
  data?: {
    category?: Category;
    categories?: Category[];
  };
};

const BASE_URL = 'http://localhost:8000/api/category';

const handleCategoryError = (error: unknown): CategoryResponse => {
  const axiosError = error as AxiosError<{ error: string }>;
  return {
    success: false,
    error: axiosError?.response?.data?.error ?? 'Something went wrong',
  };
};

// ✅ Get all categories
export const getAllCategories = async (): Promise<CategoryResponse> => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (error) {
    return handleCategoryError(error);
  }
};

// ✅ Get single category by ID
export const getCategoryById = async (id: string): Promise<CategoryResponse> => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    return handleCategoryError(error);
  }
};

// ✅ Add new category
export const addCategory = async (category: {
  name: string;
  slug: string;
  description?: string;
}): Promise<CategoryResponse> => {
  try {
    const res = await axios.post(BASE_URL, category, { withCredentials: true });
    return res.data;
  } catch (error) {
    return handleCategoryError(error);
  }
};

// ✅ Update category by ID
export const updateCategory = async (
  id: string,
  updates: {
    name: string;
    slug: string;
    description?: string;
  }
): Promise<CategoryResponse> => {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, updates, { withCredentials: true });
    return res.data;
  } catch (error) {
    return handleCategoryError(error);
  }
};

// ✅ Delete category by ID
export const deleteCategory = async (id: string): Promise<CategoryResponse> => {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`, { withCredentials: true });
    return res.data;
  } catch (error) {
    return handleCategoryError(error);
  }
};
