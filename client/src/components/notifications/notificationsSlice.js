import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: { notifications: null },
  reducers: {
    setNotifications: (state, action) => {
      const notificationsList = action.payload;
      state.notifications = notificationsList;
    },
  },
});

export const { setNotifications } = notificationsSlice.actions;

export default notificationsSlice.reducer;

export const selectNotifications = (state) => state.notifications.notifications;