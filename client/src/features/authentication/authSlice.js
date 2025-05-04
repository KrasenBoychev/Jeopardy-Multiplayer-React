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
    updateOnlineStatus: (state, action) => {
      const socketId = action.payload;
      state.user.gameDetails.socketId = socketId;
      state.user.gameDetails.online = !state.user.gameDetails.online;
    },
    updateGameInProgress: (state, action) => {
      state.user.gameDetails.gameInProgress =
        !state.user.gameDetails.gameInProgress;
    },
    deleteCredentials: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const {
  setCredentials,
  updateOnlineStatus,
  updateGameInProgress,
  deleteCredentials,
} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
