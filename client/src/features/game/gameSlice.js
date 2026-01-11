import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    activeFriends: [],
    gameReqSentBy: [],
    isNewGameStarted: false,
    isGameCompleted: false,
  },
  reducers: {
    setActiveFriends: (state, action) => {
      state.activeFriends = action.payload;
    },
    updateGameReqSentBy: (state, action) => {
      const { username, updateType } = action.payload;

      if (updateType == "add") {
        state.gameReqSentBy.push(username);
      } else if (updateType == "remove") {
        if (state.gameReqSentBy.includes(username)) {
          state.gameReqSentBy = state.gameReqSentBy.filter(
            (friendUsername) => friendUsername != username
          );
        }
      }
    },
    updateIsNewGameStarted: (state, action) => {
      state.isNewGameStarted = !state.isNewGameStarted;
    },
    updateIsGameCompleted: (state, action) => {
      state.isGameCompleted = !state.isGameCompleted;
    },
    deleteGameDetails: (state, action) => {
      state.activeFriends = [];
      state.gameReqSentBy = [];
      state.isNewGameStarted = false;
      state.isGameCompleted = false;
    },
  },
});

export const {
  setActiveFriends,
  updateGameReqSentBy,
  updateIsNewGameStarted,
  updateIsGameCompleted,
  deleteGameDetails,
} = gameSlice.actions;

export default gameSlice.reducer;

export const selectGameReqSentBy = (state) => state.game.gameReqSentBy;
export const selectIsNewGameStarted = (state) => state.game.isNewGameStarted;
export const selectActiveFriends = (state) => state.game.activeFriends;
export const selectIsGameCompleted = (state) => state.game.isGameCompleted;
