import {
    exerciceUpdated, exerciceUpdateFailed, exerciceUpdateStarted,
} from "@/src/exercice/features/update-exercice/update-exercice.events";
import {createReducer} from "@reduxjs/toolkit";
import {
    updateExerciceInitialState, UpdatExerciceStatus
} from "@/src/exercice/features/update-exercice/update-exercice.state.model";

const updateExerciceReducer = createReducer(updateExerciceInitialState, (builder) => {
    builder
        .addCase(exerciceUpdateStarted, (state) => {
            state.status = UpdatExerciceStatus.LOADING;
        })
        .addCase(exerciceUpdated, (state) => {
            state.status = UpdatExerciceStatus.SUCCESS;
        })
        .addCase(exerciceUpdateFailed, (state, action) => {
            state.status = UpdatExerciceStatus.ERROR;
            state.error = action.payload;
        });
});

export default updateExerciceReducer;