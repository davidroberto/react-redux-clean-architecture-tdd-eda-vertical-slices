import {RootState} from "@/src/shared/application/root.store";

export const getDeleteExerciceStatus = (state: RootState) => state.exercices.delete.status;

export const getDeleteExerciceError = (state: RootState) => state.exercices.delete.error;