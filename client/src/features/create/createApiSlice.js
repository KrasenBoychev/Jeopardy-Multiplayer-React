import { apiSlice } from "../../app/api/apiSlice";

export const createApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    recordSingleQuestion: builder.mutation({
      query: (questionDetails) => ({
        url: "/create/singleQuestion",
        method: "POST",
        body: { questionDetails },
      }),
    }),
    recordCategoryAndQuestions: builder.mutation({
      query: (items) => ({
        url: "/create/categoryAndQuestions",
        method: "POST",
        body: { items },
      }),
    }),
  }),
});

export const {
  useRecordSingleQuestionMutation,
  useRecordCategoryAndQuestionsMutation,
} = createApiSlice;
