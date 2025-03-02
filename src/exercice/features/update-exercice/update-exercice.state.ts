import {RootState} from "@/src/shared/application/root.state";

export type UpdateExerciceState = {
    status: UpdatExerciceStatus;
    error: string | null;
};

export enum UpdatExerciceStatus {
    IDLE = "idle", LOADING = "loading", SUCCESS = "success", ERROR = "error",
}

export const updateExerciceInitialState: UpdateExerciceState = {
    status: UpdatExerciceStatus.IDLE,
    error: null,
};
export const getExerciceUpdateStatus = (state: RootState) => state.exercices.update.status;

export const getExerciceUpdateError = (state: RootState) => state.exercices.update.error;