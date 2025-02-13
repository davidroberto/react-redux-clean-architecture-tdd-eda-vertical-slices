import {createReducer} from "@reduxjs/toolkit";
import {
    exerciceLoaded, exerciceLoadingFailed, exerciceLoadingStarted,
} from "@/src/exercice/features/get-exercice-by-id/get-exercice-by-id.events";
import {Exercice} from "@/src/exercice/features/shared/exercice.model.type";

type CurrentExerciceState = {
    exercice: Exercice | null;
    isLoading: boolean;
};

const currentExerciceInitialState: CurrentExerciceState = {
    exercice: null,
    isLoading: false,
};

const getExerciceByIdReducer = createReducer(currentExerciceInitialState, (builder) => {
    builder
        .addCase(exerciceLoadingStarted, (state) => {
            state.isLoading = true;
        })
        .addCase(exerciceLoaded, (state, action) => {
            state.isLoading = false;
            state.exercice = action.payload;
        })
        .addCase(exerciceLoadingFailed, (state) => {
            state.isLoading = false;
        });
});

export default getExerciceByIdReducer;