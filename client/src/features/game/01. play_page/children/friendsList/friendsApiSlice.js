import { apiSlice } from "../../../../../app/api/apiSlice";

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
    sendFriendReq: builder.mutation({
      query: (friendUsername) => ({
        url: "/friends/sendFriendReq",
        method: "POST",
        body: {
          friendUsername,
        },
      }),
    }),
  }),
});

export const { useGetFriendsDetailsMutation, useSendFriendReqMutation } =
  friendsApiSlice;
