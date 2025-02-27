import {RootState} from "@/src/shared/application/root.store";

export const getExercicesListLoading = (state: RootState) => state.exercices.list.isLoading;

export const getExercicesList = (state: RootState) => state.exercices.list.exercices;
