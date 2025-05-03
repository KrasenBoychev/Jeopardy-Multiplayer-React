import { apiSlice } from "../../app/api/apiSlice";

export const notificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => "/users/getNotifications",
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationsApiSlice;
