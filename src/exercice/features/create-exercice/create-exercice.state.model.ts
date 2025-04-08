import {RootState} from "@/src/shared/application/root.state";

export type CreateExerciceStateModel = {
    error: string | null;
    status: CreateExerciceStatus;
};

export enum CreateExerciceStatus {
    IDLE = "idle", LOADING = "loading", SUCCESS = "success", ERROR = "error",
}

export const createExerciceInitialState: CreateExerciceStateModel = {
    error: null,
    status: CreateExerciceStatus.IDLE
};

export const getExerciceCreateStatus = (state: RootState) => {
    return state.exercices.create.status;
}

export const getExerciceCreateError = (state: RootState) => {
    return state.exercices.create.error;
}