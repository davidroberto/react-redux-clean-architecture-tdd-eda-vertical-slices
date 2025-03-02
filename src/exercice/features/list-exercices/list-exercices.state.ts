import {Exercice, ExercicesSortedByMuscle} from "@/src/exercice/features/shared/exercice.state";

import {RootState} from "@/src/shared/application/root.state";

export type ListExercicesState = {
    data: Exercice[] | ExercicesSortedByMuscle[];
    status: ListExercicesStatus;
    error: string | null;
};

export enum ListExercicesStatus {
    IDLE = "idle", LOADING = "loading", SUCCESS = "success", ERROR = "error",
}

export const listExercicesInitialState: ListExercicesState = {
    data: [],
    status: ListExercicesStatus.IDLE,
    error: null,
};
export const getExercicesListError = (state: RootState) => state.exercices.list.error;

export const getExercicesListStatus = (state: RootState) => state.exercices.list.status;

export const getExercicesListData = (state: RootState) => state.exercices.list.data;