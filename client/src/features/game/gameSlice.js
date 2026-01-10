import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    activeFriends: [],
    gameReqSentBy: [],
    isNewGameStarted: false,
    readyToPlay: false,
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
    updateReadyToPlay: (state, action) => {
      state.readyToPlay = !state.readyToPlay;
    },
    deleteGameDetails: (state, action) => {
      state.gameReqSentBy = [];
      state.isNewGameStarted = false;
      state.readyToPlay = false;
      state.activeFriends = [];
    },
  },
});

export const {
  setActiveFriends,
  updateGameReqSentBy,
  updateIsNewGameStarted,
  updateReadyToPlay,
  deleteGameDetails,
} = gameSlice.actions;

export default gameSlice.reducer;

export const selectGameReqSentBy = (state) => state.game.gameReqSentBy;
export const selectIsNewGameStarted = (state) => state.game.isNewGameStarted;
export const selectReadyToPlay = (state) => state.game.readyToPlay;
export const selectActiveFriends = (state) => state.game.activeFriends;
