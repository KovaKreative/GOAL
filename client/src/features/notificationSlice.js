import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notificationList: [],
    pendingBuddyRequests: [],
    sentBuddyRequests: [],
    read: false
  },
  reducers: {
    fetchNotifications: (state, action) => {
      console.log('session user', action);
      return { ...state, user: { ...action.payload } };
    },
    addNotification: (state, action) => {
      //let newNotif = state.notifications.push(action.payload)
      //return { ...state, notifications: newNotif };
      state.notificationList.push(action.payload);
    },
    removeNotification: (state, action) => {
      //let newNotif = state.notifications.push(action.payload)
      //return { ...state, notifications: newNotif };
      state.notificationList.push(action.payload);
    },
    resetNotifications: (state, action) => {
      return {
        notificationList: [],
        pendingBuddyRequests: [],
        sentBuddyRequests: [],
        read: false
      }
    },
    resetNotifications: (state, action) => {
      return { ...state, notifications: [] };
    },
    fetchPendingBuddyRequests: (state, action) => {
      return { ...state, pendingBuddyRequests: action.payload };
    },
    fetchSentBuddyRequests: (state, action) => {
      return { ...state, sentBuddyRequests: action.payload };
    },
    removePendingBuddyRequest: (state, action) => {
      const id = action.payload;
      const index = state.pendingBuddyRequests.findIndex(r => r.id === id);
      console.log(id, index);
      state.pendingBuddyRequests.splice(index, 1);
    },

  }
});

export const { fetchNotifications, addNotification, removeNotification, resetNotifications, fetchPendingBuddyRequests, fetchSentBuddyRequests, removePendingBuddyRequest } = notificationSlice.actions;
export default notificationSlice.reducer;