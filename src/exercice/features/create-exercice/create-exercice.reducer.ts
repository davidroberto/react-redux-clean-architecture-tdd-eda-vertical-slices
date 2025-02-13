import {
    exerciceCreated, exerciceCreationFailed, exerciceCreationStarted,
} from "@/src/exercice/features/create-exercice/create-exercice.events";
import {createReducer} from "@reduxjs/toolkit";

export type CreateExerciceState = {
    isLoading: boolean;
};

export const createExerciceInitialState: CreateExerciceState = {
    isLoading: false,
};

const createExerciceReducer = createReducer(createExerciceInitialState, (builder) => {
    builder
        .addCase(exerciceCreationStarted, (state) => {
            state.isLoading = true;
        })
        .addCase(exerciceCreated, (state) => {
            state.isLoading = false;
        })
        .addCase(exerciceCreationFailed, (state) => {
            state.isLoading = false;
        })
});

export default createExerciceReducer;
