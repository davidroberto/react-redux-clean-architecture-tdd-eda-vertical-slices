import {RootState} from "@/src/shared/application/root.store";

export const getExerciceCreateLoading = (state: RootState) => state.exercices.create.isLoading;