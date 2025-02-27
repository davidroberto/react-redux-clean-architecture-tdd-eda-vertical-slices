import {RootState} from "@/src/shared/application/root.store";

export const getNotificationsList = (state: RootState) => state.notifications.list;