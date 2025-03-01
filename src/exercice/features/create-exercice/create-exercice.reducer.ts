import {createReducer} from "@reduxjs/toolkit";
import {
    exerciceCreated, exerciceCreationFailed, exerciceCreationStarted
} from "@/src/exercice/features/create-exercice/create-exercice.events";

export enum CreateExerciceStatus {
    IDLE = "idle", LOADING = "loading", SUCCESS = "success", ERROR = "error",
}

export type CreateExerciceState = {
    error: string | null;
    status: CreateExerciceStatus;
};

export const createExerciceInitialState: CreateExerciceState = {
    error: null,
    status: CreateExerciceStatus.IDLE
};

const createExerciceReducer = createReducer(createExerciceInitialState, (builder) => {
    builder
        .addCase(exerciceCreationStarted, (state) => {
            state.status = CreateExerciceStatus.LOADING;
        })

        .addCase(exerciceCreated, (state) => {
            state.status = CreateExerciceStatus.SUCCESS;
        })

        .addCase(exerciceCreationFailed, (state, action) => {
            state.status = CreateExerciceStatus.ERROR;
            state.error = action.payload;
        })

});

export default createExerciceReducer;
