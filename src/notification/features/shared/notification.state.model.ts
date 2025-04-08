import {RootState} from "@/src/shared/application/root.state";

export type NotificationsState = {
    list: Notification[];
}

export type Notification = {
    id: string;
    message: string;
    type: NotificationType;
};

export enum NotificationType {
    SUCCESS = "success", ERROR = "error",
}

export const notificationsInitialState: NotificationsState = {
    list: [],
};

export const getNotificationsList = (state: RootState) => state.notifications.list;