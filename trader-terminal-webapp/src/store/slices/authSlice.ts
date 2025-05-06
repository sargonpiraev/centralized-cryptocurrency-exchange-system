import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, LoginFormData, RegisterFormData, ApiError } from '../../types/auth';
import * as authApi from '../../api/auth';

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

export const login = createAsyncThunk<
  { user: AuthState['user']; token: string },
  LoginFormData,
  { rejectValue: ApiError }
>('auth/login', async (data, { rejectWithValue }) => {
  try {
    const response = await authApi.login(data);
    localStorage.setItem('token', response.token);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || { 
      message: 'An error occurred during login',
      code: 'UNKNOWN_ERROR',
      status: 500,
    });
  }
});

export const register = createAsyncThunk<
  { user: AuthState['user']; token: string },
  RegisterFormData,
  { rejectValue: ApiError }
>('auth/register', async (data, { rejectWithValue }) => {
  try {
    const response = await authApi.register(data);
    localStorage.setItem('token', response.token);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || {
      message: 'An error occurred during registration',
      code: 'UNKNOWN_ERROR',
      status: 500,
    });
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authApi.logout();
});

export const checkAuth = createAsyncThunk<
  { user: AuthState['user']; token: string },
  void,
  { rejectValue: ApiError }
>('auth/check', async (_, { rejectWithValue }) => {
  try {
    const response = await authApi.checkAuth();
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || {
      message: 'Authentication check failed',
      code: 'AUTH_CHECK_FAILED',
      status: 401,
    });
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Registration failed';
      });

    // Logout
    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
      });

    // Check Auth
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer; 