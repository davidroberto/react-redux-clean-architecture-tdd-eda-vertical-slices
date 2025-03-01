import {RootState} from "@/src/shared/application/root.store";

export const getExerciceByIdData = (state: RootState) => state.exercices.getById.data;

export const getExerciceByIdStatus = (state: RootState) => state.exercices.getById.status;

export const getExerciceByIdError = (state: RootState) => state.exercices.getById.error;