import { apiSlice } from "../../app/api/apiSlice";

export const createApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // register: builder.mutation({
    //   query: (credentials) => ({
    //     url: "/auth/register",
    //     method: "POST",
    //     body: { ...credentials },
    //   }),
    // }),
  }),
});

export const {} = createApiSlice;
