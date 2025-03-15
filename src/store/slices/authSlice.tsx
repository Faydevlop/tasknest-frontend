import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


// Interfaces

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Manager' | 'Employee';
  token: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token:string | null;
  loading: boolean;
  error: string | null;
}


// Initial State

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  token:null,
  loading: false,
  error: null,
};


// Async Thunks

const BASE_URL = import.meta.env.VITE_BASE_URL; 

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData: { name: string; email: string; password: string;  }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async (userData:{ otp: string ,email:string}, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/verifyOTP`, userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);


// Slice

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
    },
    clearError:(state)=>{
        state.error = null
    }
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Signup
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // VerifyOTP
    builder
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state,action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


// Exports

export const { logout,clearError } = authSlice.actions;
export default authSlice.reducer;
