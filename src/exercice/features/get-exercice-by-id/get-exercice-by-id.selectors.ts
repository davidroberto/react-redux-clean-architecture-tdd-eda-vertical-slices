import {RootState} from "@/src/shared/application/root.store";

export const getCurrentExerciceLoading = (state: RootState) => state.exercices.current.isLoading;

export const getCurrentExercice = (state: RootState) => state.exercices.current.exercice;