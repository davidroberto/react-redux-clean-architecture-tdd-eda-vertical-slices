import {Thunk} from "@/src/shared/application/thunk.type";
import {
    exercicesLoaded, exercicesLoadingFailed, exercicesLoadingStarted,
} from "@/src/exercice/features/list-exercices/list-exercices.events";
import {
    exerciceUpdated, exerciceUpdateFailed, exerciceUpdateStarted,
} from "@/src/exercice/features/update-exercice/update-exercice.events";
import {Dispatch} from "@reduxjs/toolkit";
import {ExerciceRepositoryInterface} from "@/src/exercice/features/shared/exercice.repository.interface";

export type UpdateExerciceCommand = {
    title: string;
    description: string | null;
    image: string | null;
    youtubeVideoUrl: string | null;
    primaryMuscles: [{
        id: string
    }];
    secondaryMuscles: [{
        id: string
    }];
};
export const updateExerciceUseCase = (
    exerciceId: string, updateExercice: UpdateExerciceCommand): Thunk => async (dispatch, _, {exerciceRepository}) => {
    dispatch(exerciceUpdateStarted());
    try {
        await exerciceRepository.update(exerciceId, updateExercice);
        dispatch(exerciceUpdated());

        fetchExercices(dispatch, exerciceRepository);
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An error occurred while updating the exercice.";
        dispatch(exerciceUpdateFailed(errorMessage));
    }
};

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
