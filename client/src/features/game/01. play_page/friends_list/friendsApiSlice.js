import { apiSlice } from "../../../../app/api/apiSlice";

export const friendsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFriendsList: builder.query({
      query: () => "/friends/getFriendsList",
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
  useGetFriendsListQuery,
  useSendFriendReqMutation,
  useSendFriendResMutation,
} = friendsApiSlice;
