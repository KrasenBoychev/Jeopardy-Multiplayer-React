import { createSlice } from "@reduxjs/toolkit";

const playersSlice = createSlice({
  name: "players",
  initialState: {
    rivalPlayer: null,
    firstPlayer: null,
    secondPlayer: null,
    activePlayer: null,
  },
  reducers: {
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
    deletePlayersDetails: (state, action) => {
      state.rivalPlayer = null;
      state.firstPlayer = null;
      state.secondPlayer = null;
      state.activePlayer = null;
    },
  },
});

export const {
  updateRivalPlayer,
  updateStartingPlayers,
  setActivePlayer,
  updateActivePlayer,
  deletePlayersDetails,
} = playersSlice.actions;

export default playersSlice.reducer;

export const selectFirstPlayer = (state) => state.players.firstPlayer;
export const selectSecondPlayer = (state) => state.players.secondPlayer;
export const selectRivalPlayer = (state) => state.players.rivalPlayer;
export const selectActivePlayer = (state) => state.players.activePlayer;
