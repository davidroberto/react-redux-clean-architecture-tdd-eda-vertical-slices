import {
    exerciceUpdated, exerciceUpdateFailed, exerciceUpdateStarted,
} from "@/src/exercice/features/update-exercice/update-exercice.events";
import {createReducer} from "@reduxjs/toolkit";

type UpdateExerciceState = {
    isLoading: boolean;
};

const updateExerciceInitialState: UpdateExerciceState = {
    isLoading: false,
};

const updateExerciceReducer = createReducer(updateExerciceInitialState, (builder) => {
    builder
        .addCase(exerciceUpdateStarted, (state) => {
            state.isLoading = true;
        })
        .addCase(exerciceUpdated, (state) => {
            state.isLoading = false;
        })
        .addCase(exerciceUpdateFailed, (state) => {
            state.isLoading = false;
        });
});

export default updateExerciceReducer;