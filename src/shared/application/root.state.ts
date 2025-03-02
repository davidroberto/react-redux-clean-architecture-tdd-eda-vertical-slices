import {ExercicesState} from "@/src/exercice/features/shared/exercice.state";
import {NotificationsState} from "@/src/notification/features/shared/notification.state";

export type RootState = {
    exercices: ExercicesState;
    notifications: NotificationsState
}