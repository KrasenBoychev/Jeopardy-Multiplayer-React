import { apiSlice } from "../../app/api/apiSlice";

export const createApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkIfCategoryExists: builder.mutation({
      query: (categoryName) => ({
        url: "/create/checkCategory",
        method: "POST",
        body: { categoryName },
      }),
    }),
    checkIfQuestionExists: builder.mutation({
      query: (questionName) => ({
        url: "/create/checkQuestion",
        method: "POST",
        body: { questionName },
      }),
    }),
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
  useCheckIfCategoryExistsMutation,
  useCheckIfQuestionExistsMutation,
  useRecordSingleQuestionMutation,
  useRecordCategoryAndQuestionsMutation,
} = createApiSlice;
