import {RootState} from "@/src/shared/application/root.state";
import {Exercice} from "@/src/exercice/features/shared/exercice.state.model";

export type GetExerciceByIdStateModel = {
    data: Exercice | null;
    status: GetExerciceByIdStatus;
    error: string | null;
};

export enum GetExerciceByIdStatus {
    IDLE = "idle", LOADING = "loading", SUCCESS = "success", ERROR = "error",
}

export const getExerciceByIdInitialState: GetExerciceByIdStateModel = {
    data: null,
    status: GetExerciceByIdStatus.IDLE,
    error: null
};
export const getExerciceByIdStatus = (state: RootState) => state.exercices.getById.status;

export const getExerciceByIdData = (state: RootState) => state.exercices.getById.data;

export const getExerciceByIdError = (state: RootState) => state.exercices.getById.error;