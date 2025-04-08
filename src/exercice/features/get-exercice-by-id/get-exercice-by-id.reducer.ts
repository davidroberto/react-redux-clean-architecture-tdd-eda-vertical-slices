import {createReducer} from "@reduxjs/toolkit";
import {
    exerciceLoaded, exerciceLoadingFailed, exerciceLoadingStarted,
} from "@/src/exercice/features/get-exercice-by-id/get-exercice-by-id.events";
import {
    getExerciceByIdInitialState, GetExerciceByIdStatus
} from "@/src/exercice/features/get-exercice-by-id/get-exercice-by-id.state.model";

const getExerciceByIdReducer = createReducer(getExerciceByIdInitialState, (builder) => {
    builder
        .addCase(exerciceLoadingStarted, (state) => {
            state.status = GetExerciceByIdStatus.LOADING;
        })
        .addCase(exerciceLoaded, (state, action) => {
            state.data = action.payload;
            state.status = GetExerciceByIdStatus.SUCCESS;
        })
        .addCase(exerciceLoadingFailed, (state, action) => {
            state.status = GetExerciceByIdStatus.ERROR;
            state.error = action.payload;
        });
});

export default getExerciceByIdReducer;