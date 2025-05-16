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
      // providesTags: (result, error, arg) => [
      //   { type: "FriendsList", id: "LIST" },
      //   ...result.ids.map((id) => ({ type: "FriendsList", id })),
      // ],
    }),
    // getSingleFriend: builder.mutation({
    //   query: (username) => ({
    //     url: "/users/singleFriend",
    //     method: "POST",
    //     body: {
    //       username,
    //     },
    //   }),
    // invalidatesTags: (result, error, arg) => [
    //   { type: "FriendsList", id: arg.id },
    // ],
    // }),
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
