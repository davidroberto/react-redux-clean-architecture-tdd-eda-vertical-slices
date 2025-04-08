import {NotificationsState} from "@/src/notification/features/shared/notification.state.model";
import {ExercicesState} from "@/src/exercice/features/shared/exercice.state.model";

export type RootState = {
    exercices: ExercicesState;
    notifications: NotificationsState
}