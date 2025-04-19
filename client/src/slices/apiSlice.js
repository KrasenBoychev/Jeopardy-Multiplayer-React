import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {baseURL} from '../app/baseURL';

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
