import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: null,
    username: null,
    email: null,
  },
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Signup reducers
    signupStart(state) {
      state.loading = true;
      state.error = null;
    },
    signupSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = {
        id: action.payload.uid,
        username: action.payload.displayName,
        email: action.payload.email,
      };
    },
    signupFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Login reducers
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = {
        id: action.payload.uid,
        username: action.payload.displayName,
        email: action.payload.email,
      };
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Logout reducer
    logout(state) {
      state.isAuthenticated = false;
      state.user = {
        id: null,
        username: null,
        email: null,
      };
    },

    // Set authenticated user (e.g., for restoring session from local storage)
    setUser(state, action) {
      state.isAuthenticated = true;
      state.user = {
        id: action.payload.uid,
        username: action.payload.displayName,
        email: action.payload.email,
      };
    },
  },
});

export const { 
  signupStart, signupSuccess, signupFailure,
  loginStart, loginSuccess, loginFailure,
  logout, setUser 
} = authSlice.actions;

export default authSlice.reducer;
