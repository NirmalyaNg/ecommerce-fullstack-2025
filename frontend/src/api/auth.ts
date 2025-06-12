import { User, UserData } from '@/models/user';
import axios, { AxiosError } from 'axios';

type AuthResponse = {
  success: boolean;
  message?: string;
  error?: string;
  data?: {
    user: User;
  };
};

// Register
export const registerUser = async (userData: UserData): Promise<AuthResponse> => {
  try {
    const response = await axios.post('http://localhost:8000/api/auth/register', userData);
    return response.data;
  } catch (error: unknown) {
    return handleAuthError(error);
  }
};

// Login
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post(
      'http://localhost:8000/api/auth/login',
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error: unknown) {
    return handleAuthError(error);
  }
};

// GetCurrentUser
export const getCurrentUser = async (): Promise<AuthResponse> => {
  try {
    const response = await axios.get('http://localhost:8000/api/auth/me', {
      withCredentials: true, // Ensure cookie is sent
    });
    return response.data;
  } catch (error: unknown) {
    return handleAuthError(error);
  }
};

export const logoutUser = async (): Promise<AuthResponse> => {
  try {
    const response = await axios.post('http://localhost:8000/api/auth/logout', null, {
      withCredentials: true, // Ensure cookie is sent
    });
    return response.data;
  } catch (error: unknown) {
    return handleAuthError(error);
  }
};

const handleAuthError = (error: unknown) => {
  const axiosError = error as AxiosError<{ error: string }>;
  return {
    success: false,
    error: axiosError?.response?.data?.error ?? 'Something went wrong',
  };
};
