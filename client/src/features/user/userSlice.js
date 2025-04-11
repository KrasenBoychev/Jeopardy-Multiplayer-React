import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopPlayers: builder.query({
      query: () => "/users/topPlayers",
      transformErrorResponse: (responseData) => {
        return userAdapter.setAll(initialState, responseData);
      },
    }),
  }),
});

export const { useGetTopPlayersQuery } = userApiSlice;
