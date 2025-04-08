import {createAction} from "@reduxjs/toolkit";

export const exerciceUpdateStarted = createAction("EXERCICE_UPDATE_STARTED");
export const exerciceUpdated = createAction("EXERCICE_UPDATED");
export const exerciceUpdateFailed = createAction("EXERCICE_UPDATE_FAILED", (errorMessage: string) => ({
    payload: errorMessage,
}));
