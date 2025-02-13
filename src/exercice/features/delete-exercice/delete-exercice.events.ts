import {createAction} from "@reduxjs/toolkit";

export const exerciceDeletionStarted = createAction(
    "EXERCICE_DELETION_STARTED",
);
export const exerciceDeleted = createAction("EXERCICE_DELETED");
export const exerciceDeletionFailed = createAction<string>(
    "EXERCICE_DELETION_FAILED",
);
