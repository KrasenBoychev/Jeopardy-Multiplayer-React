import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    gameReqSentBy: [],
    isNewGameStarted: false,
    setStartGameDetails: false,
    readyToPlay: false,
  },
  reducers: {
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
    updateSetStartGameDetails: (state, action) => {
      state.setStartGameDetails = !state.setStartGameDetails;
    },
    updateReadyToPlay: (state, action) => {
      state.readyToPlay = !state.readyToPlay;
    },
    deleteGameDetails: (state, action) => {
      state.gameReqSentBy = [];
      state.isNewGameStarted = false;
      state.setStartGameDetails = false;
      state.readyToPlay = false;
    },
  },
});

export const {
  updateGameReqSentBy,
  updateIsNewGameStarted,
  updateSetStartGameDetails,
  updateReadyToPlay,
  deleteGameDetails,
} = gameSlice.actions;

export default gameSlice.reducer;

export const selectGameReqSentBy = (state) => state.game.gameReqSentBy;
export const selectIsNewGameStarted = (state) => state.game.isNewGameStarted;
export const selectSetStartGameDetails = (state) =>
  state.game.setStartGameDetails;
export const selectReadyToPlay = (state) => state.game.readyToPlay;
