export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData extends Omit<LoginFormData, 'rememberMe'> {
  confirmPassword: string;
}

export interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}

export interface AuthResponse {
  user: User;
  token: string;
} 