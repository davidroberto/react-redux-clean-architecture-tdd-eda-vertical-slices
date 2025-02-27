import {RootState} from "@/src/shared/application/root.store";

export const getExerciceUpdateLoading = (state: RootState) => state.exercices.update.isLoading;