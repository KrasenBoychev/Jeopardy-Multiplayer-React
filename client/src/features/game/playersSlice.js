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
    setFirstSecondActivePlayer: (state, action) => {
      const { firstPlayerDetails, secondPlayerDetails } = action.payload;
      state.firstPlayer = firstPlayerDetails;
      state.secondPlayer = secondPlayerDetails;
      state.activePlayer = firstPlayerDetails;
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
  setFirstSecondActivePlayer,
  updateRivalPlayer,
  updateActivePlayer,
  deletePlayersDetails,
} = playersSlice.actions;

export default playersSlice.reducer;

export const selectFirstPlayer = (state) => state.players.firstPlayer;
export const selectSecondPlayer = (state) => state.players.secondPlayer;
export const selectRivalPlayer = (state) => state.players.rivalPlayer;
export const selectActivePlayer = (state) => state.players.activePlayer;
