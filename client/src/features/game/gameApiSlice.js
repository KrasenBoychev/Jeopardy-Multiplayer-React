import { apiSlice } from "../../app/api/apiSlice";

export const gameApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "game/allCategories",
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
  useGetCategoriesQuery,
  useGetQuestionsMutation,
  useRecordPlayerPointsMutation,
} = gameApiSlice;
