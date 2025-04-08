import {createReducer} from "@reduxjs/toolkit";
import {
    exercicesLoaded, exercicesLoadingFailed, exercicesLoadingStarted
} from "@/src/exercice/features/list-exercices/list-exercices.events";
import {
    listExercicesInitialState, ListExercicesStatus
} from "@/src/exercice/features/list-exercices/list-exercices.state.model";

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