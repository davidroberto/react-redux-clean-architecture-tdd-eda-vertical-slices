import { NotificationType } from "@/src/notification/features/shared/notification-type.enum";

export type Notification = {
  id: string;
  message: string;
  type: NotificationType;
};
