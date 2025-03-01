import {createReducer} from "@reduxjs/toolkit";
import {
    exercicesLoaded, exercicesLoadingFailed, exercicesLoadingStarted,
} from "@/src/exercice/features/list-exercices/list-exercices.events";
import {Exercice, ExercicesSortedByMuscle} from "@/src/exercice/features/shared/exercice.model.type";

export enum ListExercicesStatus {
    IDLE = "idle", LOADING = "loading", SUCCESS = "success", ERROR = "error",
}

type ListExercicesReducer = {
    data: Exercice[] | ExercicesSortedByMuscle[];
    status: ListExercicesStatus;
    error: string | null;
};

const listExercicesInitialState: ListExercicesReducer = {
    data: [],
    status: ListExercicesStatus.IDLE,
    error: null,
};

const listExercicesReducer = createReducer(listExercicesInitialState, (builder) => {
    builder
        .addCase(exercicesLoadingStarted, (state) => {
            state.status = ListExercicesStatus.LOADING;
        })
        .addCase(exercicesLoaded, (state, action) => {
            state.data = action.payload;
            state.status = ListExercicesStatus.SUCCESS;
        })
        .addCase(exercicesLoadingFailed, (state, action) => {
            state.error = action.payload;
            state.status = ListExercicesStatus.ERROR;
        });
});

export default listExercicesReducer;
