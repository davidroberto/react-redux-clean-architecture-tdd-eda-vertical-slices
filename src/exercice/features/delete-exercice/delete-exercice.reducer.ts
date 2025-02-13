import {
    exerciceDeleted, exerciceDeletionFailed, exerciceDeletionStarted,
} from "@/src/exercice/features/delete-exercice/delete-exercice.events";
import {createReducer} from "@reduxjs/toolkit";

type DeleteExerciceState = {
    isLoading: boolean;
};

const deleteExerciceInitialState: DeleteExerciceState = {
    isLoading: false,
};

const deleteExerciceReducer = createReducer(deleteExerciceInitialState, (builder) => {
    builder
        .addCase(exerciceDeletionStarted, (state) => {
            state.isLoading = true;
        })
        .addCase(exerciceDeleted, (state) => {
            state.isLoading = false;
        })
        .addCase(exerciceDeletionFailed, (state) => {
            state.isLoading = false;
        })
});

export default deleteExerciceReducer;
