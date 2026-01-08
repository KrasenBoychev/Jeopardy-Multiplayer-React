import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: { socketReqName: null, socketData: null },
  reducers: {
    setSocketReq: (state, action) => {
      const { socketReqName, socketData } = action.payload;
      state.socketReqName = socketReqName;
      state.socketData = socketData;
    },
    deleteSocketReqDetails: (state, action) => {
      state.socketReqName = null;
      state.socketData = null;
    },
  },
});

export const { setSocketReq, deleteSocketReqDetails } = socketSlice.actions;

export default socketSlice.reducer;

export const selectSocketReqName = (state) => state.socket.socketReqName;
export const selectSocketData = (state) => state.socket.socketData;
