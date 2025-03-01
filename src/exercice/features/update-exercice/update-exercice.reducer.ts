import {
    exerciceUpdated, exerciceUpdateFailed, exerciceUpdateStarted,
} from "@/src/exercice/features/update-exercice/update-exercice.events";
import {createReducer} from "@reduxjs/toolkit";

export enum UpdatExerciceStatus {
    IDLE = "idle", LOADING = "loading", SUCCESS = "success", ERROR = "error",
}

type UpdateExerciceState = {
    status: UpdatExerciceStatus;
    error: string | null;
};

const updateExerciceInitialState: UpdateExerciceState = {
    status: UpdatExerciceStatus.IDLE,
    error: null,
};

const updateExerciceReducer = createReducer(updateExerciceInitialState, (builder) => {
    builder
        .addCase(exerciceUpdateStarted, (state) => {
            state.status = UpdatExerciceStatus.LOADING;
        })
        .addCase(exerciceUpdated, (state) => {
            state.status = UpdatExerciceStatus.SUCCESS;
        })
        .addCase(exerciceUpdateFailed, (state, action) => {
            state.status = UpdatExerciceStatus.ERROR;
            state.error = action.payload;
        });
});

export default updateExerciceReducer;