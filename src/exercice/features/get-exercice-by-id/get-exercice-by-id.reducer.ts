import {createReducer} from "@reduxjs/toolkit";
import {
    exerciceLoaded, exerciceLoadingFailed, exerciceLoadingStarted,
} from "@/src/exercice/features/get-exercice-by-id/get-exercice-by-id.events";
import {Exercice} from "@/src/exercice/features/shared/exercice.model.type";

export enum GetExerciceByIdStatus {
    IDLE = "idle", LOADING = "loading", SUCCESS = "success", ERROR = "error",
}

type GetExerciceByIdState = {
    data: Exercice | null;
    status: GetExerciceByIdStatus;
    error: string | null;
};

const getExerciceByIdInitialState: GetExerciceByIdState = {
    data: null,
    status: GetExerciceByIdStatus.IDLE,
    error: null
};

const getExerciceByIdReducer = createReducer(getExerciceByIdInitialState, (builder) => {
    builder
        .addCase(exerciceLoadingStarted, (state) => {
            state.status = GetExerciceByIdStatus.LOADING;
        })
        .addCase(exerciceLoaded, (state, action) => {
            state.data = action.payload;
            state.status = GetExerciceByIdStatus.SUCCESS;
        })
        .addCase(exerciceLoadingFailed, (state, action) => {
            state.status = GetExerciceByIdStatus.ERROR;
            state.error = action.payload;
        });
});

export default getExerciceByIdReducer;