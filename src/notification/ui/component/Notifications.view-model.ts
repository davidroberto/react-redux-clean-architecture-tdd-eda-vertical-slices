import {useDispatch, useSelector} from "react-redux";

import {getNotificationsList} from "@/src/notification/features/shared/notification.state.model";
import {removeNotificationUseCase} from "@/src/notification/features/remove-notification/remove-notification.use-case";

export const NotificationsViewModel = () => {
    const dispatch = useDispatch();

    const notifications = useSelector(getNotificationsList);

    const handleCloseNotification = (id: string) => {
        dispatch(removeNotificationUseCase(id));
    };

    return {
        notifications,
        handleCloseNotification
    };
};

