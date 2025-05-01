import { createSlice } from "@reduxjs/toolkit";

const friendsSlice = createSlice({
  name: "friends",
  initialState: { friends: null },
  reducers: {
    setFriends: (state, action) => {
      const friendsList = action.payload;
      state.friends = friendsList;
    },
    updateFriendStatus: (state, action) => {
      const { username, socketId } = action.payload;
      state.friends = state.friends.map((friend) => {
        if (friend.username == username) {
          friend.online = socketId == "" ? false : true;
          friend.socketId = socketId;
        }
        return friend;
      });
    },
  },
});

export const { setFriends, updateFriendStatus } = friendsSlice.actions;

export default friendsSlice.reducer;

export const selectFriends = (state) => state.friends.friends;
