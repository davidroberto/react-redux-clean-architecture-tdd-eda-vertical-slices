import {Notification} from "@/src/notification/features/shared/notification.model";

export type NotificationsState = {
    list: Notification[];
}

export const notificationsInitialState: NotificationsState = {
    list: [],
};
