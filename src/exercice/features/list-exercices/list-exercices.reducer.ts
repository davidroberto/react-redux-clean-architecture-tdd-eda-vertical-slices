import {createReducer} from "@reduxjs/toolkit";
import {
    exercicesLoaded, exercicesLoadingFailed, exercicesLoadingStarted,
} from "@/src/exercice/features/list-exercices/list-exercices.events";
import {Exercice, ExercicesSortedByMuscle} from "@/src/exercice/features/shared/exercice.model.type";

type ListExercicesReducer = {
    exercices: Exercice[] | ExercicesSortedByMuscle[];
    isLoading: boolean;
};

const listExercicesInitialState: ListExercicesReducer = {
    exercices: [],
    isLoading: false,
};

const listExercicesReducer = createReducer(listExercicesInitialState, (builder) => {
    builder
        .addCase(exercicesLoadingStarted, (state) => {
            state.isLoading = true;
        })
        .addCase(exercicesLoaded, (state, action) => {
            state.isLoading = false;
            state.exercices = action.payload;
        })
        .addCase(exercicesLoadingFailed, (state) => {
            state.isLoading = false;
        });
});

export default listExercicesReducer;
