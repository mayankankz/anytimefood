import { createSlice } from '@reduxjs/toolkit';
const initialState = { isAuthenticated: false, userDetails : {} }
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,

  reducers: {
    Authenticated(state,action) {
      state.isAuthenticated = true;
      state.userDetails = action.payload;
    },
    logout(state,action) {
        state.isAuthenticated = false;
        state.userDetails = {};
    }
  },
});

export const authActions = authSlice.actions;
export default authSlice;
