import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

// const userAdapter = createEntityAdapter();

// const initialState = userAdapter.getInitialState();

export const socketApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changeOnlineStatus: builder.mutation({
      query: () => ({
        url: "/users/changeOnlineStatus",
        method: "POST",
        // body: {
        //   online: true
        // },
      }),
    }),
  }),
});

export const { useChangeOnlineStatusMutation } = socketApiSlice;
