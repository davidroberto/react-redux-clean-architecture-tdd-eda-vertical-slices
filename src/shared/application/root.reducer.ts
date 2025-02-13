import {combineReducers} from "@reduxjs/toolkit";
import exercicesReducer from "@/src/exercice/features/shared/exercice.reducer";
import notificationsReducer from "@/src/notification/features/shared/notification.reducer";

const rootReducer = combineReducers({
    exercices: exercicesReducer,
    notifications: notificationsReducer,
});

export default rootReducer;
