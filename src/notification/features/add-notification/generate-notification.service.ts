import {NotificationType} from "@/src/notification/features/shared/notification-type.enum";

export const generateNotification = (
    message: string,
    type: NotificationType,
) => {
    return {id: crypto.randomUUID(), message, type};
};
