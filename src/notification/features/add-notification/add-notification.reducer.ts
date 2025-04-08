import {exerciceCreated, exerciceCreationFailed,} from "@/src/exercice/features/create-exercice/create-exercice.events";
import {exerciceDeleted, exerciceDeletionFailed,} from "@/src/exercice/features/delete-exercice/delete-exercice.events";
import {
    exerciceLoaded, exerciceLoadingFailed,
} from "@/src/exercice/features/get-exercice-by-id/get-exercice-by-id.events";
import {exercicesLoadingFailed,} from "@/src/exercice/features/list-exercices/list-exercices.events";
import {exerciceUpdated, exerciceUpdateFailed,} from "@/src/exercice/features/update-exercice/update-exercice.events";
import {createReducer} from "@reduxjs/toolkit";
import {notificationsInitialState, NotificationType} from "@/src/notification/features/shared/notification.state.model";
import {generateNotification} from "@/src/notification/features/add-notification/notification-generator.service";

const addNotificationReducer = createReducer(notificationsInitialState, (builder) => {
    builder
        .addCase(exerciceCreated, (state) => {
            state.list.push(generateNotification("Exercice créé", NotificationType.SUCCESS));
        })
        .addCase(exerciceCreationFailed, (state, action) => {
            state.list.push(generateNotification(action.payload, NotificationType.ERROR));
        })
        .addCase(exerciceDeletionFailed, (state, action) => {
            state.list.push(generateNotification(action.payload, NotificationType.ERROR));
        })
        .addCase(exerciceDeleted, (state) => {
            state.list.push(generateNotification("Exercice suppression réussie", NotificationType.SUCCESS));
        })
        .addCase(exerciceLoaded, (state) => {
            state.list.push(generateNotification("Exercice récupération réussie", NotificationType.SUCCESS));
        })
        .addCase(exerciceLoadingFailed, (state, action) => {
            state.list.push(generateNotification(action.payload, NotificationType.ERROR));
        })
        .addCase(exercicesLoadingFailed, (state, action) => {
            state.list.push(generateNotification(action.payload, NotificationType.ERROR));
        })
        .addCase(exerciceUpdateFailed, (state, action) => {
            state.list.push(generateNotification(action.payload, NotificationType.ERROR));
        })
        .addCase(exerciceUpdated, (state) => {
            state.list.push(generateNotification("Exercice mise à jour réussie", NotificationType.SUCCESS));
        });
});

export default addNotificationReducer;