import { createSlice } from "@reduxjs/toolkit";

const authDetails = localStorage.getItem("auth");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: authDetails ? JSON.parse(authDetails).user : null,
    token: authDetails ? JSON.parse(authDetails).accessToken : null,
    isUserOnlineFromAnotherDevice: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    setUserOnlineFromAnotherDevice: (state, action) => {
      state.isUserOnlineFromAnotherDevice = action.payload;
    },
    deleteCredentials: (state, action) => {
      state.user = null;
      state.token = null;
      state.isUserOnlineFromAnotherDevice = false;
    },
  },
});

export const {
  setCredentials,
  setUserOnlineFromAnotherDevice,
  deleteCredentials,
} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsUserOnlineFromAnotherDevice = (state) =>
  state.auth.isUserOnlineFromAnotherDevice;
