import {createReducer} from "@reduxjs/toolkit";
import {
    exerciceCreated, exerciceCreationFailed, exerciceCreationStarted
} from "@/src/exercice/features/create-exercice/create-exercice.events";
import {
    createExerciceInitialState, CreateExerciceStatus
} from "@/src/exercice/features/create-exercice/create-exercice.state.model";

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
