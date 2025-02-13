import {RootState} from "@/src/shared/application/root.store";
import {notificationRemoveStarted} from "@/src/notification/features/remove-notification/remove-notification.events";
import {useDispatch, useSelector} from "react-redux";

export const NotificationsViewModel = () => {
    const dispatch = useDispatch();

    const notifications = useSelector(
        (state: RootState) => state.notifications.list,
    );

    const handleCloseNotification = (id: string) => {
        dispatch(notificationRemoveStarted(id));
    };
    return {notifications, handleCloseNotification};
};
