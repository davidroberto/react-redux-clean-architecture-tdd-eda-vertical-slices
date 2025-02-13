import {createAction} from "@reduxjs/toolkit";

export const notificationRemoveStarted = createAction<string>(
    "NOTIFICATION_REMOVE_STARTED",
);
