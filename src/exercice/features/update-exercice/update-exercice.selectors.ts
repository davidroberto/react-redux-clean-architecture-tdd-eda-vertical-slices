import {RootState} from "@/src/shared/application/root.store";

export const getExerciceUpdateStatus = (state: RootState) => state.exercices.update.status;

export const getExerciceUpdateError = (state: RootState) => state.exercices.update.error;