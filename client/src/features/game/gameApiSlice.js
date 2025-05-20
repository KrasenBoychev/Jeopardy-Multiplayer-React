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
    getQuestions: builder.mutation({
      query: (categoriesIDs) => ({
        url: "game/questions",
        method: "POST",
        body: {
          categoriesIDs,
        },
      }),
    }),
  }),
});

export const {
  useChangeGameInProgressMutation,
  useGetCategoriesMutation,
  useGetQuestionsMutation,
} = gameApiSlice;
