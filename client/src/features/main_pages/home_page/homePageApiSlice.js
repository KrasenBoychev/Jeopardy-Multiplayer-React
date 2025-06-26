import { apiSlice } from "../../../app/api/apiSlice";

export const homePageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopPlayers: builder.query({
      query: () => "/users/topPlayers",
    }),
  }),
});

export const { useGetTopPlayersQuery } = homePageApiSlice;
