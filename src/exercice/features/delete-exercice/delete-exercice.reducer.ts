import {
    exerciceDeleted, exerciceDeletionFailed, exerciceDeletionStarted,
} from "@/src/exercice/features/delete-exercice/delete-exercice.events";
import {createReducer} from "@reduxjs/toolkit";

export enum DeleteExerciceStatus {
    IDLE = "idle", LOADING = "loading", SUCCESS = "success", ERROR = "error",
}

type DeleteExerciceState = {
    status: DeleteExerciceStatus;
    error: string | null;
};

const deleteExerciceInitialState: DeleteExerciceState = {
    status: DeleteExerciceStatus.IDLE,
    error: null,
};

const deleteExerciceReducer = createReducer(deleteExerciceInitialState, (builder) => {
    builder
        .addCase(exerciceDeletionStarted, (state) => {
            state.status = DeleteExerciceStatus.LOADING;
        })
        .addCase(exerciceDeleted, (state) => {
            state.status = DeleteExerciceStatus.SUCCESS;
        })
        .addCase(exerciceDeletionFailed, (state, action) => {
            state.status = DeleteExerciceStatus.ERROR;
            state.error = action.payload;
        })
});

export default deleteExerciceReducer;
