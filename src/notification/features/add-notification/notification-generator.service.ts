import {NotificationType} from "@/src/notification/features/shared/notification.state";

export const generateNotification = (message: string, type: NotificationType,) => {
    return {
        id: crypto.randomUUID(),
        message,
        type
    };
};
