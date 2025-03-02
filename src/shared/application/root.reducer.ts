import {combineReducers} from "@reduxjs/toolkit";
import exercicesReducer from "@/src/exercice/features/shared/exercice.reducer";
import notificationsReducer from "@/src/notification/features/shared/notification.reducer";
import {RootState} from "@/src/shared/application/root.state";
import {Reducer} from "redux";

const rootReducer: Reducer<RootState> = combineReducers({
    exercices: exercicesReducer,
    notifications: notificationsReducer,
});

export default rootReducer;
