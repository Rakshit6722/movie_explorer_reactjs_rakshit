import { createSlice } from "@reduxjs/toolkit";
import { Notification } from "../../types/type";

interface NotificationsState {
    items: Notification[];
    unreadCount: number
}

const initialState: NotificationsState = {
    items: [],
    unreadCount: 0
}

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers:{
        addNotification: (state, action) => {
            const newNotification: Notification = {
                id: Date.now().toString(),
                timestamp: Date.now(),
                read: false,
                ...action.payload
            }

            state.items.unshift(newNotification);
            state.unreadCount += 1;
        },
        markAllAsRead: (state) => {
            state.items.forEach((item) => {
                item.read = true;
            })
            state.unreadCount = 0;
        },
        markAsRead: (state, action) => {
            const notification = state.items.find((item) => item.id === action.payload);
            if(notification && !notification.read){
                notification.read = true;
                state.unreadCount = Math.max(0, state.unreadCount - 1);
            }
        },
        clearNotifications: (state) => {
            state.items = [];
            state.unreadCount = 0;
        }

    }
})

export const { addNotification, markAllAsRead, markAsRead, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;