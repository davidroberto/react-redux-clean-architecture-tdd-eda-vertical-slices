import {combineReducers} from "@reduxjs/toolkit";
import createExerciceReducer from "@/src/exercice/features/create-exercice/create-exercice.reducer";
import getExerciceByIdReducer from "@/src/exercice/features/get-exercice-by-id/get-exercice-by-id.reducer";
import updateExerciceReducer from "@/src/exercice/features/update-exercice/update-exercice.reducer";
import {Reducer} from "redux";
import listExercicesReducer from "@/src/exercice/features/list-exercices/list-exercices.reducer";
import deleteExerciceReducer from "@/src/exercice/features/delete-exercice/delete-exercice.reducer";
import {ExercicesState} from "@/src/exercice/features/shared/exercice.state.model";

const exercicesReducer: Reducer<ExercicesState> = combineReducers({
    delete: deleteExerciceReducer,
    update: updateExerciceReducer,
    create: createExerciceReducer,
    list: listExercicesReducer,
    getById: getExerciceByIdReducer,

});

export default exercicesReducer;
