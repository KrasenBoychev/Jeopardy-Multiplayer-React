// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { io } from "socket.io-client";
// import { baseURL } from "../app/baseURL";
// import { json } from "react-router-dom";

// const initialState = {
//   socket: null,
//   status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
//   error: null,
// };

// export const fetchSocket = createAsyncThunk("socket/fetchSocket", async () => {
//   const response = io(baseURL);
//   // const response = 'bla bla';
//   return response;
// });

// export const socketSlice = createSlice({
//   name: "socket",
//   initialState,
//   reducers: {
//     // createSocket: (state) => {
//     //   state.socketInfo = io(baseURL);
//     //   // state.socketInfo = "bla bla";
//     // },
//   },
//   extraReducers(builder) {
//     builder
//       .addCase(fetchSocket.pending, (state, action) => {
//         state.status = "loading";
//       })
//       .addCase(fetchSocket.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.socket = action.payload;
//       })
//       .addCase(fetchSocket.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export const selectSocket = (state) => state.socket.socket;
// export const getSocketStatus = (state) => state.socket.status;
// export const getSocketError = (state) => state.socket.error;

// export default socketSlice.reducer;
