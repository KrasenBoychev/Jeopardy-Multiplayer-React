import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "../features/authentication/authSlice";
import socketReducer from "../features/socket_connection/socketSlice";
import gameReducer from "../features/game/gameSlice";
import playersReducer from "../features/game/playersSlice";
import categoriesReducer from "../features/game/03. categories/categoriesSlice";
import questionsReducer from "../features/game/04. questions/questionsSlice";
import answerReducer from "../features/game/05. answers/answerSlice";
import createItemsReducer from "../features/create/createSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    socket: socketReducer,
    game: gameReducer,
    players: playersReducer,
    categories: categoriesReducer,
    questions: questionsReducer,
    answer: answerReducer,
    createItems: createItemsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
