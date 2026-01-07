import { createSlice } from "@reduxjs/toolkit";

const friendsSlice = createSlice({
  name: "friends",
  initialState: { friends: [] },
  reducers: {
    setFriends: (state, action) => {
      const friendsList = action.payload;
      state.friends = friendsList;
    },
    addNewFriend: (state, action) => {
      const newFriend = action.payload;
      state.friends.push(newFriend);
    },
    deleteFriends: (state, action) => {
      state.friends = [];
    },
  },
});

export const { setFriends, addNewFriend, deleteFriends } = friendsSlice.actions;

export default friendsSlice.reducer;

export const selectFriends = (state) => state.friends.friends;
