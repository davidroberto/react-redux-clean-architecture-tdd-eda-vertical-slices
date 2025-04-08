import {
    exerciceDeleted, exerciceDeletionFailed, exerciceDeletionStarted,
} from "@/src/exercice/features/delete-exercice/delete-exercice.events";
import {createReducer} from "@reduxjs/toolkit";
import {
    deleteExerciceInitialState, DeleteExerciceStatus
} from "@/src/exercice/features/delete-exercice/delete-exercice.state.model";

const deleteExerciceReducer = createReducer(deleteExerciceInitialState, (builder) => {
    builder
        .addCase(exerciceDeletionStarted, (state) => {
            state.status = DeleteExerciceStatus.LOADING;
        })
        .addCase(exerciceDeleted, (state) => {
            state.status = DeleteExerciceStatus.SUCCESS;
        })

        .addCase(exerciceDeletionFailed, (state, action) => {
            state.status = DeleteExerciceStatus.ERROR
            state.error = action.payload;
        });

});

export default deleteExerciceReducer;
