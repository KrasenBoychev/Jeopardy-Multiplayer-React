import { apiSlice } from "../../app/api/apiSlice";

export const notificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => "/users/getNotifications",
    }),
    removeNotification: builder.mutation({
      query: ({ friendUsername, type }) => ({
        url: "/users/removeNotification",
        method: "POST",
        body: {
          friendUsername,
          type,
        },
      }),
    }),
  }),
});

export const { useGetNotificationsQuery, useRemoveNotificationMutation } =
  notificationsApiSlice;
