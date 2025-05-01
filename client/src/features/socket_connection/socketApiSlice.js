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
    getFriendsDetails: builder.mutation({
      query: (friendsList) => ({
        url: "/users/friendsDetails",
        method: "POST",
        body: {
          friendsList,
        },
      }),
    }),
  }),
});

export const { useChangeOnlineStatusMutation, useGetFriendsDetailsMutation } =
  socketApiSlice;
