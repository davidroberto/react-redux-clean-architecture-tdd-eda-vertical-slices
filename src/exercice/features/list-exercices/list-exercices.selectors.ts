import {RootState} from "@/src/shared/application/root.store";

export const getExercicesListStatus = (state: RootState) => state.exercices.list.status;

export const getExercicesListData = (state: RootState) => state.exercices.list.data;

export const getExercicesListError = (state: RootState) => state.exercices.list.error;