import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { baseURL } from "../app/baseURL";

const initialState = {
  socketInfo: null,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    createSocket: (state) => {
      state.socketInfo = io(baseURL);
      // state.socketInfo = "bla bla";
    },
  },
});

export const { createSocket } = socketSlice.actions;

export default socketSlice.reducer;
