import {createAction} from "@reduxjs/toolkit";
import {Exercice, ExercicesSortedByMuscle,} from "@/src/exercice/features/shared/exercice.model.type";

export const exercicesLoadingStarted = createAction(
    "EXERCICES_LOADING_STARTED",
);
export const exercicesLoaded = createAction<
    ExercicesSortedByMuscle[] | Exercice[]
>("EXERCICES_LOADED");
export const exercicesLoadingFailed = createAction<string>(
    "EXERCICES_LOADING_FAILED",
);
