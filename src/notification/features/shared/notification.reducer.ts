import {removeNotificationReducer} from "@/src/notification/features/remove-notification/remove-notification.reducer";
import addNotificationReducer from "@/src/notification/features/add-notification/add-notification.reducer";
import composeReducers from "@/src/shared/application/compose-reducers.service";
import {NotificationsState} from "@/src/notification/features/shared/notification.state.model";

const notificationsReducer = composeReducers<NotificationsState>(addNotificationReducer, removeNotificationReducer);

export default notificationsReducer;
