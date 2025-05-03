import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "../features/authentication/authSlice";
import socketReducer from "../features/socket_connection/socketSlice";
import friendsReducer from "../features/game/01. play_page/children/friendsList/friendsSlice";
import gameReducer from "../features/game/gameSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    socket: socketReducer,
    friends: friendsReducer,
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
