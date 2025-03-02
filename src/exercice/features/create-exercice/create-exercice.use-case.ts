import {Thunk} from "@/src/shared/application/thunk.type";
import {Dispatch} from "@reduxjs/toolkit";
import {
    exerciceCreated, exerciceCreationFailed, exerciceCreationStarted,
} from "@/src/exercice/features/create-exercice/create-exercice.events";
import {
    exercicesLoaded, exercicesLoadingFailed, exercicesLoadingStarted,
} from "@/src/exercice/features/list-exercices/list-exercices.events";
import {Muscle} from "@/src/muscle/features/shared/muscle.model.type";
import {validateExerciceService} from "@/src/exercice/features/create-exercice/create-exercice-validator.service";
import {ExerciceRepositoryInterface} from "@/src/exercice/features/shared/exercice.repository.interface";

export type CreateExerciceCommand = {
    title: string;
    description: string | null;
    image: string | null;
    youtubeVideoUrl: string | null;
    primaryMuscles: Partial<Muscle>[];
    secondaryMuscles: Partial<Muscle>[];
};

export const createExerciceUseCase = (createExercice: CreateExerciceCommand): Thunk => async (
    dispatch: Dispatch, _, {exerciceRepository}) => {
    dispatch(exerciceCreationStarted());

    const errors = validateExercice(createExercice, dispatch);

    if (errors.length > 0) {
        return;
    }

    try {
        await exerciceRepository.create(createExercice);

        dispatch(exerciceCreated());

        fetchExercices(dispatch, exerciceRepository);
    } catch (error: any) {
        const errorMessage = error instanceof Error ? error.message : "Exercice création échouée";
        dispatch(exerciceCreationFailed(errorMessage));
    }
};

const validateExercice = (createExercice: CreateExerciceCommand, dispatch: Dispatch): string[] => {

    const errors = validateExerciceService(createExercice);

    if (errors.length > 0) {
        for (const error of errors) {
            dispatch(exerciceCreationFailed("Exercice création échouée : " + error));
        }
    }

    return errors;
}

const fetchExercices = async (dispatch: Dispatch, exerciceRepository: ExerciceRepositoryInterface) => {
    dispatch(exercicesLoadingStarted());

    try {
        const exercices = await exerciceRepository.findAll();

        dispatch(exercicesLoaded(exercices));
    } catch (error: any) {
        const errorMessage = error instanceof Error ? error.message : "Exercice création échouée";
        dispatch(exercicesLoadingFailed(errorMessage));
    }
}
