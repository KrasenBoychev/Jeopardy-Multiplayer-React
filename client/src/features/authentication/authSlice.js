import { createSlice } from "@reduxjs/toolkit";

const authDetails = localStorage.getItem("auth");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: authDetails ? JSON.parse(authDetails).user : null,
    token: authDetails ? JSON.parse(authDetails).accessToken : null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    deleteCredentials: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, deleteCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
