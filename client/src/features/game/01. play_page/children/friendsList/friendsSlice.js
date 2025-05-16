import { createSlice } from "@reduxjs/toolkit";

const friendsSlice = createSlice({
  name: "friends",
  initialState: { friends: [] },
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
    updateFriendGameInProgress: (state, action) => {
      const username = action.payload;
      state.friends = state.friends.map((friend) => {
        if (friend.username == username) {
          friend.gameInProgress = !friend.gameInProgress;
        }
        return friend;
      });
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

export const {
  setFriends,
  updateFriendStatus,
  updateFriendGameInProgress,
  addNewFriend,
  deleteFriends,
} = friendsSlice.actions;

export default friendsSlice.reducer;

export const selectFriends = (state) => state.friends.friends;
