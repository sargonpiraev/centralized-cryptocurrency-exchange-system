import axios from 'axios';
import { LoginFormData, RegisterFormData, AuthResponse } from '../types/auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const authApi = axios.create({
  baseURL: `${API_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (data: LoginFormData): Promise<AuthResponse> => {
  const response = await authApi.post<AuthResponse>('/login', data);
  return response.data;
};

export const register = async (data: RegisterFormData): Promise<AuthResponse> => {
  const response = await authApi.post<AuthResponse>('/register', data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await authApi.post('/logout');
  localStorage.removeItem('token');
};

export const checkAuth = async (): Promise<AuthResponse> => {
  const response = await authApi.get<AuthResponse>('/me');
  return response.data;
}; 