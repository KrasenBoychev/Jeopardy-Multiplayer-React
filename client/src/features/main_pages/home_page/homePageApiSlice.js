import { apiSlice } from "../../../app/api/apiSlice";

export const homePageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopPlayers: builder.mutation({
      query: () => ({
        url: "/users/topPlayers",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTopPlayersMutation } = homePageApiSlice;
