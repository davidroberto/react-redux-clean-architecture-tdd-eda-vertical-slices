import {RootState} from "@/src/shared/application/root.store";

export const getDeleteExerciceLoading = (state: RootState) => state.exercices.delete.isLoading;