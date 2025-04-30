import { createSlice } from "@reduxjs/toolkit";

const friendsSlice = createSlice({
  name: "friends",
  initialState: { friends: null },
  reducers: {
    setFriends: (state, action) => {
      const friendsList = action.payload;
      state.friends = friendsList;
    },
  },
});

export const { setFriends } = friendsSlice.actions;

export default friendsSlice.reducer;

export const selectFriends = (state) => state.friends.friends;
