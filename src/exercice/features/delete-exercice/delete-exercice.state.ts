import {RootState} from "@/src/shared/application/root.store";

export type DeleteExerciceState = {
    status: DeleteExerciceStatus;
    error: string | null;
};

export enum DeleteExerciceStatus {
    IDLE = "idle", LOADING = "loading", SUCCESS = "success", ERROR = "error",
}

export const deleteExerciceInitialState: DeleteExerciceState = {
    status: DeleteExerciceStatus.IDLE,
    error: null,
};
export const getDeleteExerciceStatus = (state: RootState) => state.exercices.delete.status;

export const getDeleteExerciceError = (state: RootState) => state.exercices.delete.error;