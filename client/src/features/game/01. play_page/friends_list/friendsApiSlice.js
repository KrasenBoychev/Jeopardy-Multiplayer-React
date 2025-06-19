import { apiSlice } from "../../../../app/api/apiSlice";

export const friendsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFriendsDetails: builder.mutation({
      query: (friendsList) => ({
        url: "/users/friendsDetails",
        method: "POST",
        body: {
          friendsList,
        },
      }),
    }),
    getOnlineFriends: builder.mutation({
      query: (friendsList) => ({
        url: "/users/onlineFriends",
        method: "POST",
        body: {
          friendsList,
        },
      }),
    }),
    sendFriendReq: builder.mutation({
      query: (friendUsername) => ({
        url: "/friends/sendFriendReq",
        method: "POST",
        body: {
          friendUsername,
        },
      }),
    }),
    sendFriendRes: builder.mutation({
      query: ({ friendUsername, response }) => ({
        url: "/friends/sendFriendRes",
        method: "POST",
        body: {
          friendUsername,
          response,
        },
      }),
    }),
  }),
});

export const {
  useGetFriendsDetailsMutation,
  useGetOnlineFriendsMutation,
  useSendFriendReqMutation,
  useSendFriendResMutation,
} = friendsApiSlice;
