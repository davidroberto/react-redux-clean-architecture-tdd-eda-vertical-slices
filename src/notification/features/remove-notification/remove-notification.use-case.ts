import { Thunk } from "@/src/shared/application/thunk.type";
import { notificationRemoveStarted } from "@/src/notification/features/remove-notification/remove-notification.events";

export const removeNotificationUseCase =
  (notificationId: string): Thunk =>
  async (dispatch) => {
    dispatch(notificationRemoveStarted(notificationId));
  };
