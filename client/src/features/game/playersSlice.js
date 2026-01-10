import { createSlice } from "@reduxjs/toolkit";

const playersSlice = createSlice({
  name: "players",
  initialState: {
    roomId: null,
    rivalPlayer: null,
    firstPlayer: null,
    secondPlayer: null,
    activePlayer: null,
  },
  reducers: {
    setPlayersAndRoom: (state, action) => {
      const { firstPlayerDetails, secondPlayerDetails, roomId } =
        action.payload;
      state.firstPlayer = firstPlayerDetails;
      state.secondPlayer = secondPlayerDetails;
      state.activePlayer = firstPlayerDetails;
      state.roomId = roomId;
    },
    setRivalPlayer: (state, action) => {
      state.rivalPlayer = action.payload;
    },
    updateActivePlayer: (state, action) => {
      if (state.activePlayer[1].username == state.firstPlayer[1].username) {
        state.activePlayer = state.secondPlayer;
      } else {
        state.activePlayer = state.firstPlayer;
      }
    },
    updatePlayerPoints: (state, action) => {
      const { player, pointsToAdd } = action.payload;
      state[player].earnedPoints += pointsToAdd;
    },
    deletePlayersDetails: (state, action) => {
      state.rivalPlayer = null;
      state.firstPlayer = null;
      state.secondPlayer = null;
      state.activePlayer = null;
      state.roomId = null;
    },
  },
});

export const {
  setPlayersAndRoom,
  setRivalPlayer,
  updateActivePlayer,
  updatePlayerPoints,
  deletePlayersDetails,
} = playersSlice.actions;

export default playersSlice.reducer;

export const selectFirstPlayer = (state) => state.players.firstPlayer;
export const selectSecondPlayer = (state) => state.players.secondPlayer;
export const selectRivalPlayer = (state) => state.players.rivalPlayer;
export const selectActivePlayer = (state) => state.players.activePlayer;
export const selectRoomId = (state) => state.players.roomId;
