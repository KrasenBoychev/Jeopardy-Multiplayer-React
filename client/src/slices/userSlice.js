import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopPlayers: builder.query({
      query: () => "/users/topPlayers",
    }),
    recordUserInOnlineUsers: builder.mutation({
      query: (data) => ({
        url: "/users/recordNewOnlineUser",
        method: "POST",
        body: {
          username: data.username,
          socketId: data.socketId,
        },
      }),
    }),
  }),
});

export const { useGetTopPlayersQuery, useRecordUserInOnlineUsersMutation } =
  userApiSlice;
