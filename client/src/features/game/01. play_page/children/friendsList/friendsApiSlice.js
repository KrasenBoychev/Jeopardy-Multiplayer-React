import { apiSlice } from "../../../../../app/api/apiSlice";

export const friendsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // changeOnlineStatus: builder.mutation({
    //   query: (data) => ({
    //     url: "/users/changeOnlineStatus",
    //     method: "POST",
    //     body: {
    //       username: data.username,
    //       socketId: data.socketId,
    //     },
    //   }),
    // }),
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

export const { useSendFriendReqMutation } = friendsApiSlice;
