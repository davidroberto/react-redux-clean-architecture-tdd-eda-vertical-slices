import {createAction} from "@reduxjs/toolkit";

export const exerciceCreationStarted = createAction("EXERCICE_CREATION_STARTED",);
export const exerciceCreated = createAction("EXERCICE_CREATED");
export const exerciceCreationFailed = createAction("EXERCICE_CREATION_FAILED", (errorMessage: string) => ({
    payload: errorMessage,
}));
