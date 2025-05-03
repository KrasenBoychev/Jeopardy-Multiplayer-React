import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: { gameReqSentBy: [], rivalPlayer: null },
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
      const { username, updateType } = action.payload;
      if (updateType == "add") {
        state.rivalPlayer = username;
      } else if (updateType == "remove") {
        state.rivalPlayer = null;
      }
    },
    deleteGameDetails: (state, action) => {
      state.gameReqSentBy = [];
      state.rivalPlayer = null;
    },
  },
});

export const { updateGameReqSentBy, updateRivalPlayer, deleteGameDetails } =
  gameSlice.actions;

export default gameSlice.reducer;

export const selectGameReqSentBy = (state) => state.game.gameReqSentBy;
