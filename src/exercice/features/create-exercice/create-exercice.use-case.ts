import {Thunk} from "@/src/shared/application/thunk.type";
import {Dispatch} from "@reduxjs/toolkit";
import {CreateExerciceCommand} from "@/src/exercice/features/create-exercice/create-exercice.command";
import {
    exerciceCreated, exerciceCreationFailed, exerciceCreationStarted,
} from "@/src/exercice/features/create-exercice/create-exercice.events";
import {
    exercicesLoaded, exercicesLoadingFailed, exercicesLoadingStarted,
} from "@/src/exercice/features/list-exercices/list-exercices.events";
import {validateExercice} from "@/src/exercice/features/create-exercice/create-exercice.validator";

export const createExerciceUseCase = (createExercice: CreateExerciceCommand): Thunk => async (
    dispatch: Dispatch, _, {exerciceRepository}) => {
    dispatch(exerciceCreationStarted());

    const errors = validateExercice(createExercice);

    if (errors.length > 0) {
        for (const error of errors) {
            dispatch(exerciceCreationFailed("Exercice création échouée : " + error));
        }
        return;
    }

    try {
        await exerciceRepository.create(createExercice);

        dispatch(exerciceCreated());

        dispatch(exercicesLoadingStarted());

        try {
            const exercices = await exerciceRepository.findAll();

            dispatch(exercicesLoaded(exercices));
        } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : "Exercice création échouée";
            dispatch(exercicesLoadingFailed(errorMessage));
        }
    } catch (error: any) {
        const errorMessage = error instanceof Error ? error.message : "Exercice création échouée";
        dispatch(exerciceCreationFailed(errorMessage));
    }
};
