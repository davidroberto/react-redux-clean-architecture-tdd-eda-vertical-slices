import {RootState} from "@/src/shared/application/root.store";

export const getExerciceCreateStatus = (state: RootState) => {
    return state.exercices.create.status;
}

export const getExerciceCreateError = (state: RootState) => {
    return state.exercices.create.error;
}