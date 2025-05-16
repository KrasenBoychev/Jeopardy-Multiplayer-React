import { apiSlice } from "../../app/api/apiSlice";

export const gameApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changeGameInProgress: builder.mutation({
      query: () => ({
        url: "/users/gameInProgress",
        method: "POST",
      }),
    }),
    getCategories: builder.mutation({
      query: () => ({
        url: "game/allCategories",
        method: "GET",
      }),
    }),
  }),
});

export const { useChangeGameInProgressMutation, useGetCategoriesMutation } =
  gameApiSlice;
