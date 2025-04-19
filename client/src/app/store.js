import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/apiSlice";
import socketReducer from "../slices/socketSlice";

export const store = configureStore({
  reducer: {
    socket: socketReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
