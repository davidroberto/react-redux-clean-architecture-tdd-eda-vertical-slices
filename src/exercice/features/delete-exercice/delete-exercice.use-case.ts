import {Thunk} from "@/src/shared/application/thunk.type";
import {
    exerciceDeleted, exerciceDeletionStarted,
} from "@/src/exercice/features/delete-exercice/delete-exercice.events";
import {
    exercicesLoaded, exercicesLoadingFailed, exercicesLoadingStarted,
} from "@/src/exercice/features/list-exercices/list-exercices.events";
import {Dispatch} from "@reduxjs/toolkit";
import {ExerciceRepositoryInterface} from "@/src/exercice/features/shared/exercice.repository.interface";

export const deleteExerciceUseCase = (exerciceId: string): Thunk => async (dispatch, _, {exerciceRepository}) => {
    dispatch(exerciceDeletionStarted());
    
    await exerciceRepository.deleteById(exerciceId);

    dispatch(exerciceDeleted());

    fetchExercices(dispatch, exerciceRepository);

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