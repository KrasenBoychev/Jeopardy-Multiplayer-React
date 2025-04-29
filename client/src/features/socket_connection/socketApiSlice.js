import { apiSlice } from "../../app/api/apiSlice";

export const socketApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changeOnlineStatus: builder.mutation({
      query: (data) => ({
        url: "/users/changeOnlineStatus",
        method: "POST",
        body: {
          username: data.username,
          socketId: data.socketId,
        },
      }),
    }),
    getOnlineFriendsDetails: builder.mutation({
      query: (friendsList) => ({
        url: "/users/onlineFriends",
        method: "POST",
        body: {
          friendsList,
        },
      }),
    }),
  }),
});

export const {
  useChangeOnlineStatusMutation,
  useGetOnlineFriendsDetailsMutation,
} = socketApiSlice;
