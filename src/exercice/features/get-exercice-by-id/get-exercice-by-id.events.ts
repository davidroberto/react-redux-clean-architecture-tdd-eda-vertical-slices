import {createAction} from "@reduxjs/toolkit";
import {Exercice} from "@/src/exercice/features/shared/exercice.state.model";

export const exerciceLoadingStarted = createAction("EXERCICE_LOADING_STARTED");
export const exerciceLoaded = createAction<Exercice | null>("EXERCICE_LOADED");
export const exerciceLoadingFailed = createAction("EXERCICE_LOADING_FAILED", (errorMessage: string) => ({
    payload: errorMessage,
}));

