import { apiSlice } from "../../app/api/apiSlice";

export const gameApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changeGameInProgress: builder.mutation({
      query: () => ({
        url: "/users/gameInProgress",
        method: "POST",
      }),
    }),
    getCategories: builder.query({
      query: () => "game/allCategories",
    }),
  }),
});

export const { useChangeGameInProgressMutation, useGetCategoriesQuery } =
  gameApiSlice;
