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
    recordPlayerPoints: builder.mutation({
      query: (points) => ({
        url: "game/recordPoints",
        method: "POST",
        body: {
          points,
        },
      }),
    }),
  }),
});

export const {
  useChangeGameInProgressMutation,
  useGetCategoriesMutation,
  useGetQuestionsMutation,
  useRecordPlayerPointsMutation,
} = gameApiSlice;
