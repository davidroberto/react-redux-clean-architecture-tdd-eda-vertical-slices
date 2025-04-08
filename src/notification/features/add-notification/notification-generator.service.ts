import {NotificationType} from "@/src/notification/features/shared/notification.state.model";

export const generateNotification = (message: string, type: NotificationType,) => {
    return {
        id: crypto.randomUUID(),
        message,
        type
    };
};
