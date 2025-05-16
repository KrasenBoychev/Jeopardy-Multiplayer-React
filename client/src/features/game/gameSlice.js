import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    gameReqSentBy: [],
    rivalPlayer: null,
    firstPlayer: null,
    secondPlayer: null,
    activePlayer: null,
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
    updateRivalPlayer: (state, action) => {
      const { username, socketId, updateType } = action.payload;
      if (updateType == "add") {
        state.rivalPlayer = { username, socketId };
      } else if (
        username == state.rivalPlayer?.username &&
        updateType == "remove"
      ) {
        state.rivalPlayer = null;
      }
    },
    updateStartingPlayers: (state, action) => {
      const { firstPlayerDetails, secondPlayerDetails, updateType } =
        action.payload;
      if (updateType == "add") {
        state.firstPlayer = firstPlayerDetails;
        state.secondPlayer = secondPlayerDetails;
      } else if (updateType == "remove") {
        state.firstPlayer = null;
        state.secondPlayer = null;
      }
    },
    setActivePlayer: (state, action) => {
      state.activePlayer = state.firstPlayer;
    },
    updateActivePlayer: (state, action) => {
      if (state.activePlayer.username == state.firstPlayer.username) {
        state.activePlayer = state.secondPlayer;
      } else {
        state.activePlayer = state.firstPlayer;
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
      state.rivalPlayer = null;
      state.firstPlayer = null;
      state.secondPlayer = null;
      state.activePlayer = null;
      state.isNewGameStarted = false;
      state.setStartGameDetails = null;
      state.readyToPlay = null;
    },
  },
});

export const {
  updateGameReqSentBy,
  updateRivalPlayer,
  updateStartingPlayers,
  setActivePlayer,
  updateActivePlayer,
  updateIsNewGameStarted,
  updateSetStartGameDetails,
  updateReadyToPlay,
  deleteGameDetails,
} = gameSlice.actions;

export default gameSlice.reducer;

export const selectGameReqSentBy = (state) => state.game.gameReqSentBy;
export const selectRivalPlayer = (state) => state.game.rivalPlayer;
export const selectIsNewGameStarted = (state) => state.game.isNewGameStarted;
export const selectFirstPlayer = (state) => state.game.firstPlayer;
export const selectSecondPlayer = (state) => state.game.secondPlayer;
export const selectSetStartGameDetails = (state) =>
  state.game.setStartGameDetails;
export const selectReadyToPlay = (state) => state.game.readyToPlay;
export const selectActivePlayer = (state) => state.game.activePlayer;
