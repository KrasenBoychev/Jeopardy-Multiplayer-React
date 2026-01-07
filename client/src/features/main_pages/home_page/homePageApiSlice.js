import { apiSlice } from "../../../app/api/apiSlice";

export const homePageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopPlayers: builder.query({
      query: () => "/users/topPlayers",
    }),
    getUserPoints: builder.query({
      query: () => "/users/points",
    }),
  }),
});

export const { useGetTopPlayersQuery, useGetUserPointsQuery } =
  homePageApiSlice;
