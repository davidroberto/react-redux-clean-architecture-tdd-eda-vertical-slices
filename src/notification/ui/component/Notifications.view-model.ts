import {notificationRemoveStarted} from "@/src/notification/features/remove-notification/remove-notification.events";
import {useDispatch, useSelector} from "react-redux";

import {getNotificationsList} from "@/src/notification/features/shared/notification.state";

export const NotificationsViewModel = () => {
    const dispatch = useDispatch();

    const notifications = useSelector(getNotificationsList);

    const handleCloseNotification = (id: string) => {
        dispatch(notificationRemoveStarted(id));
    };
    return {
        notifications,
        handleCloseNotification
    };
};
