import {createAction} from "@reduxjs/toolkit";

export const exerciceUpdateStarted = createAction("EXERCICE_UPDATE_STARTED");
export const exerciceUpdated = createAction("EXERCICE_UPDATED");
export const exerciceUpdateFailed = createAction<string>(
    "EXERCICE_UPDATE_FAILED",
);
