import {notificationRemoveStarted} from "@/src/notification/features/remove-notification/remove-notification.events";
import {createReducer} from "@reduxjs/toolkit";
import {notificationsInitialState} from "@/src/notification/features/shared/notification.state";

export const removeNotificationReducer = createReducer(notificationsInitialState, (builder) => {
    builder.addCase(notificationRemoveStarted, (state, action) => {
        state.list = state.list.filter((notification) => notification.id !== action.payload,);
    });
});
