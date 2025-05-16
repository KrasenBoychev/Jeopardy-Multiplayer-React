import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "../features/authentication/authSlice";
import socketReducer from "../features/socket_connection/socketSlice";
import friendsReducer from "../features/game/01. play_page/children/friendsList/friendsSlice";
import gameReducer from "../features/game/gameSlice";
import playersReducer from "../features/game/playersSlice";
import categoriesReducer from "../features/game/04. categories/categoriesSlice";
import questionsReducer from "../features/game/06. questions/questionsSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    socket: socketReducer,
    friends: friendsReducer,
    game: gameReducer,
    players: playersReducer,
    categories: categoriesReducer,
    questions: questionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
