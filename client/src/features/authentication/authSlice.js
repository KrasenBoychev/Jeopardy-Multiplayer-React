import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
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
    updateOnlineStatus: (state, action) => {
      const socketId = action.payload;  
      state.user.gameDetails.socketId = socketId;
      state.user.gameDetails.online = !state.user.online;
    },
  },
});

export const { setCredentials, deleteCredentials, updateOnlineStatus } =
  authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
